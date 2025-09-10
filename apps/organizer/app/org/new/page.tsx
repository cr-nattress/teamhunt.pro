/**
 * New Organization Page - Consolidated Form Implementation
 * 
 * Single-page organization creation form with comprehensive error handling.
 * Features:
 * - All organization fields on one page
 * - Comprehensive form validation
 * - Network error detection and retry logic
 * - Server error handling with user-friendly messages
 * - Accessible error announcements
 * - Form persistence across page reloads
 * - Analytics tracking for all error scenarios
 * - Navigation to hunt configuration upon completion
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  ErrorDisplay,
  ValidationError,
  NetworkError,
} from '@teamhunt/ui';
import {
  trackFormView,
  trackFormAttempt, 
  trackFormSuccess,
  trackFormError,
  createAnalyticsTimer,
  type Organization,
  // Error handling imports
  validateOrganizationField,
  parseHttpError,
  withRetry,
  isNetworkError,
  isRetryableError,
  getErrorMessage,
  logError,
  AppError,
  ValidationError as SharedValidationError,
  NetworkError as SharedNetworkError,
  ServerError,
} from '@teamhunt/shared';

// Form data interface
interface OrganizationFormData {
  organizationName: string;
  adminEmail: string;
  adminFirstName: string;
  adminLastName: string;
}

// Enhanced form state
interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: AppError | Error;
  retrying?: boolean;
  submitAttempts: number;
}

// Form field type
type FormField = keyof OrganizationFormData;

export default function NewOrganizationPage() {
  // Form data with localStorage persistence
  const [formData, setFormData] = useState<OrganizationFormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('org-form-data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn('Failed to parse saved form data:', e);
        }
      }
    }
    return {
      organizationName: '',
      adminEmail: '',
      adminFirstName: '',
      adminLastName: '',
    };
  });
  
  // Field-level validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<FormField, SharedValidationError | null>>({
    organizationName: null,
    adminEmail: null,
    adminFirstName: null,
    adminLastName: null,
  });
  
  // Form-level state
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    submitAttempts: 0,
  });
  
  const [formTimer] = useState(() => createAnalyticsTimer());

  // Persist form data to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('org-form-data', JSON.stringify(formData));
    }
  }, [formData]);

  // Track form view on mount
  useEffect(() => {
    trackFormView({
      entry_point: 'landing_cta',
    });

    // Clear saved data on successful completion
    return () => {
      if (formState.status === 'success' && typeof window !== 'undefined') {
        localStorage.removeItem('org-form-data');
      }
    };
  }, []);

  // Field validation function
  const validateField = useCallback((field: FormField, value: string): SharedValidationError | null => {
    return validateOrganizationField(field, value);
  }, []);

  // Validate all form fields
  const validateAllFields = useCallback((): boolean => {
    const newErrors: Record<FormField, SharedValidationError | null> = {
      organizationName: null,
      adminEmail: null,
      adminFirstName: null,
      adminLastName: null,
    };

    let hasErrors = false;

    (Object.keys(formData) as FormField[]).forEach(field => {
      const error = validateField(field, formData[field]);
      newErrors[field] = error;
      if (error) hasErrors = true;
    });

    setFieldErrors(newErrors);
    return !hasErrors;
  }, [formData, validateField]);

  // Handle input changes with real-time validation
  const handleInputChange = useCallback((field: FormField, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: null }));
    }
    
    // Clear form-level errors
    if (formState.error) {
      setFormState(prev => ({ ...prev, error: undefined }));
    }
  }, [fieldErrors, formState.error]);

  // Handle blur validation
  const handleInputBlur = useCallback((field: FormField) => {
    const error = validateField(field, formData[field]);
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  }, [formData, validateField]);

  // API call with error handling
  const createOrganization = useCallback(async (data: OrganizationFormData): Promise<Organization> => {
    const response = await fetch('/api/organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.organizationName.trim(),
        adminEmail: data.adminEmail.trim(),
        adminFirstName: data.adminFirstName.trim(),
        adminLastName: data.adminLastName.trim(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw parseHttpError(response, errorData);
    }

    return response.json();
  }, []);

  // Handle form submission with comprehensive error handling
  const handleSubmit = useCallback(async () => {
    const attemptNumber = formState.submitAttempts + 1;
    
    setFormState(prev => ({ 
      ...prev, 
      status: 'loading', 
      submitAttempts: attemptNumber,
      error: undefined,
      retrying: false,
    }));

    // Track submission attempt
    trackFormAttempt({
      completed_steps: 1,
      form_duration: formTimer.getDuration(),
      validation_errors: Object.entries(fieldErrors)
        .filter(([_, error]) => error !== null)
        .map(([field]) => field),
    });

    try {
      // Use retry logic for network-related failures
      const organization = await withRetry(
        () => createOrganization(formData),
        {
          maxAttempts: 3,
          delayMs: 1000,
          shouldRetry: (error) => isRetryableError(error) && attemptNumber <= 2,
        }
      );

      // Track success
      trackFormSuccess({
        organization_id: organization.id,
        total_flow_duration: formTimer.getDuration(),
        attempts: attemptNumber,
      });

      setFormState(prev => ({ ...prev, status: 'success' }));

      // Redirect to hunt configuration after a short delay
      setTimeout(() => {
        window.location.href = '/hunt/new';
      }, 2000);

    } catch (error) {
      console.error('Organization creation failed:', error);
      logError(error, {
        formData: { ...formData, adminEmail: '[redacted]' }, // Don't log sensitive data
        attempt: attemptNumber,
      });

      // Track error with detailed information
      const errorInfo = error instanceof AppError ? {
        error_code: error instanceof ServerError ? error.statusCode : 400,
        error_type: error.code || error.type || 'UNKNOWN',
        attempt_number: attemptNumber,
        error_source: (error instanceof NetworkError ? 'network' : 
                      error instanceof ServerError ? 'server' : 'client') as 'network' | 'server' | 'client',
      } : {
        error_code: 500,
        error_type: 'UNKNOWN_ERROR',
        attempt_number: attemptNumber,
        error_source: 'client' as const,
      };

      trackFormError(errorInfo);

      setFormState(prev => ({ 
        ...prev, 
        status: 'error', 
        error: error instanceof Error ? error : new Error(String(error))
      }));
    }
  }, [formState.submitAttempts, formData, formTimer, fieldErrors, createOrganization]);

  // Handle retry
  const handleRetry = useCallback(async () => {
    setFormState(prev => ({ ...prev, retrying: true }));
    await handleSubmit();
  }, [handleSubmit]);

  // Handle form submission with validation
  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (validateAllFields()) {
      handleSubmit();
    }
  }, [validateAllFields, handleSubmit]);

  // Render field input with validation
  const renderFieldInput = (
    field: FormField,
    placeholder: string,
    type: 'text' | 'email' = 'text'
  ) => {
    const error = fieldErrors[field];
    const inputClasses = `w-full px-4 py-4 text-lg border-2 rounded-lg focus:outline-none transition-all duration-200 bg-white ${
      error 
        ? 'border-red-500 focus:border-red-600' 
        : 'border-gray-200 focus:border-blue-500'
    }`;

    return (
      <div>
        <input
          id={field}
          type={type}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          onBlur={() => handleInputBlur(field)}
          placeholder={placeholder}
          className={inputClasses}
          maxLength={field === 'organizationName' ? 80 : 50}
          aria-describedby={error ? `${field}-error` : undefined}
          aria-invalid={error ? true : undefined}
        />
        <ValidationError
          field={field}
          message={error?.userMessage || error?.message || ''}
          visible={!!error}
        />
      </div>
    );
  };

  // Render consolidated form content
  const renderFormContent = () => {
    return (
      <div className="space-y-6">
        {renderFieldInput(
          'organizationName',
          "Enter your organization name"
        )}
        
        {renderFieldInput(
          'adminEmail',
          "Enter your email address",
          'email'
        )}
        
        {renderFieldInput(
          'adminFirstName',
          "Enter your first name"
        )}
        
        {renderFieldInput(
          'adminLastName',
          "Enter your last name"
        )}
      </div>
    );
  };

  // Show success state
  if (formState.status === 'success') {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-900 mb-2">Organization Created!</h1>
            <p className="text-green-700">
              Welcome to TeamHunt! Redirecting to hunt configuration...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="container mx-auto px-4 py-8 max-w-4xl flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set up your organization</h1>
          <p className="text-gray-600">Let's get you started with creating amazing scavenger hunts</p>
        </div>

        {/* Form Content - Flex grow to push navigation to bottom */}
        <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col">
          <div className="bg-white rounded-2xl shadow-lg p-12 mb-8 flex-1">
            {renderFormContent()}
          </div>

          {/* Error Display */}
          {formState.error && (
            <div className="mb-8">
              {isNetworkError(formState.error) ? (
                <NetworkError
                  message={getErrorMessage(formState.error)}
                  onRetry={handleRetry}
                  retrying={formState.retrying}
                />
              ) : (
                <ErrorDisplay
                  type={formState.error instanceof SharedValidationError ? 'validation' : 'server'}
                  message={getErrorMessage(formState.error)}
                  showRetry={isRetryableError(formState.error)}
                  onRetry={isRetryableError(formState.error) ? handleRetry : undefined}
                  details={formState.error instanceof AppError ? formState.error.details?.message : undefined}
                />
              )}
            </div>
          )}

          {/* Navigation - Positioned at bottom */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t border-gray-100">
            <div className="flex justify-between items-center max-w-lg mx-auto">
              <button
                type="button"
                onClick={() => window.history.back()}
                disabled={formState.status === 'loading'}
                className="px-8 py-4 text-gray-600 font-medium rounded-xl hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                Back
              </button>

              <div></div>

              <button
                type="submit"
                disabled={formState.status === 'loading'}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center shadow-lg"
              >
                {formState.status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {formState.retrying ? 'Retrying...' : 'Creating...'}
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}