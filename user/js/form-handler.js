/**
 * Reusable Form Submission Handler
 *
 * This script handles form submissions for contact forms without modifying HTML structure.
 * Uses FormSubmit.co - FREE, NO SIGNUP REQUIRED, NO API KEYS NEEDED
 *
 * How it works:
 * - FormSubmit.co is a free service that forwards form submissions to your email
 * - No signup, no API keys, no authentication needed
 * - Just works! Emails go directly to your inbox
 *
 * Usage:
 * 1. Include this script: <script src="user/js/form-handler.js"></script>
 * 2. Set FORM_SUBMIT_CONFIG.recipientEmail to your email address
 * 3. That's it! No other setup needed.
 *
 * Configuration:
 * - Set FORM_SUBMIT_CONFIG.recipientEmail to your email address
 * - That's it! No other setup needed.
 */
(function () {
  'use strict';

  // Configuration - Just set your email address!
  var FORM_SUBMIT_CONFIG = {
    enabled: true, // Set to false to disable this handler
    recipientEmail: 'info.bigshark@gmail.com', // Recipient email address
    formId: 'detail_contact_form', // Form ID to handle
    showSuccessMessage: true,
    showErrorMessage: true,
    successMessage: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
    errorMessage: 'Sorry, there was an error sending your message. Please try again or contact us directly.',
    // FormSubmit.co endpoint (no changes needed)
    formSubmitEndpoint: 'https://formsubmit.co/ajax/'
  };

  // Only proceed if handler is enabled
  if (!FORM_SUBMIT_CONFIG.enabled) {
    return;
  }

  // Wait for DOM to be ready
  function initFormHandler() {
    var form = document.getElementById(FORM_SUBMIT_CONFIG.formId);

    if (!form) {
      console.warn('Form with ID "' + FORM_SUBMIT_CONFIG.formId + '" not found.');
      return;
    }

    // Remove existing onsubmit handler to prevent default submission
    form.onsubmit = null;

    // Add event listener for form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form submission
      e.stopPropagation(); // Stop event bubbling

      // Call existing gtag conversion tracking if it exists
      if (typeof gtag_form_conversion === 'function') {
        gtag_form_conversion();
      }

      // Validate form
      if (!form.checkValidity()) {
        form.reportValidity();
        return false;
      }

      // Collect form data
      var formData = collectFormData(form);

      // Show loading state
      var submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
      var originalButtonText = submitButton ? submitButton.innerHTML || submitButton.value : '';
      if (submitButton) {
        submitButton.disabled = true;
        if (submitButton.tagName === 'BUTTON') {
          submitButton.innerHTML = 'Sending...';
        } else {
          submitButton.value = 'Sending...';
        }
      }

      // Send form data
      sendFormData(formData, function (success, response) {
        // Restore button state
        if (submitButton) {
          submitButton.disabled = false;
          if (submitButton.tagName === 'BUTTON') {
            submitButton.innerHTML = originalButtonText;
          } else {
            submitButton.value = originalButtonText;
          }
        }

        if (success) {
          // Show success message
          if (FORM_SUBMIT_CONFIG.showSuccessMessage) {
            showMessage(FORM_SUBMIT_CONFIG.successMessage, 'success');
          }

          // Reset form
          form.reset();

          // Optional: Redirect or close modal if needed
          // window.location.href = '/thank-you.html';
        } else {
          // Show error message
          if (FORM_SUBMIT_CONFIG.showErrorMessage) {
            var errorMsg = FORM_SUBMIT_CONFIG.errorMessage;
            if (response && response.message) {
              errorMsg = response.message;
            }
            showMessage(errorMsg, 'error');
          }
        }
      });

      return false;
    });
  }

  /**
   * Collect all form data into an object
   */
  function collectFormData(form) {
    var formData = {};
    var formElements = form.querySelectorAll('input, textarea, select');

    for (var i = 0; i < formElements.length; i++) {
      var element = formElements[i];
      var name = element.name;
      var type = element.type;
      var value = element.value;

      // Skip submit buttons and file inputs
      if (type === 'submit' || type === 'button' || type === 'file') {
        continue;
      }

      // Handle checkboxes and radio buttons
      if ((type === 'checkbox' || type === 'radio') && !element.checked) {
        continue;
      }

      // Add to formData
      if (name && value !== '') {
        formData[name] = value;
      }
    }

    // Add recipient email to form data
    formData.to_email = FORM_SUBMIT_CONFIG.recipientEmail;

    return formData;
  }

  /**
   * Send form data using FormSubmit.co (no backend, no API keys, no signup needed!)
   */
  function sendFormData(formData, callback) {
    // Prepare data for FormSubmit.co
    var submitData = {
      name: formData.name || 'Website Visitor',
      email: formData.email || 'noreply@bigsharkdeveloper.com',
      phone: (formData.phone_code || '+91-') + (formData.phone || 'Not provided'),
      project: formData.project || 'Property Inquiry',
      subject: formData.subject || 'New Property Inquiry: ' + (formData.project || 'Property Inquiry'),
      message: formData.message || 'No message provided',
      captcha: formData.captcha || 'Not verified',
      _to: FORM_SUBMIT_CONFIG.recipientEmail, // Recipient email
      _subject: 'New Property Inquiry: ' + (formData.project || 'Property Inquiry'),
      _template: 'box', // FormSubmit.co template style
      _captcha: 'false' // We handle CAPTCHA separately
    };

    // Check if jQuery is available (preferred method)
    if (typeof jQuery !== 'undefined') {
      jQuery.ajax({
        url: FORM_SUBMIT_CONFIG.formSubmitEndpoint + FORM_SUBMIT_CONFIG.recipientEmail,
        method: 'POST',
        data: submitData,
        dataType: 'json',
        success: function (response) {
          if (response.success) {
            callback(true, {
              message: 'Email sent successfully'
            });
          } else {
            callback(false, {
              message: response.message || FORM_SUBMIT_CONFIG.errorMessage
            });
          }
        },
        error: function (xhr, status, error) {
          console.error('Form submission error:', error);
          callback(false, {
            message: 'Network error. Please check your connection and try again.'
          });
        }
      });
    } else {
      // Use vanilla JavaScript Fetch API
      var formDataObj = new FormData();
      for (var key in submitData) {
        if (submitData.hasOwnProperty(key)) {
          formDataObj.append(key, submitData[key]);
        }
      }

      fetch(FORM_SUBMIT_CONFIG.formSubmitEndpoint + FORM_SUBMIT_CONFIG.recipientEmail, {
        method: 'POST',
        body: formDataObj,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            callback(true, {
              message: 'Email sent successfully'
            });
          } else {
            callback(false, {
              message: data.message || FORM_SUBMIT_CONFIG.errorMessage
            });
          }
        })
        .catch(function (error) {
          console.error('Form submission error:', error);
          callback(false, {
            message: 'Network error. Please check your connection and try again.'
          });
        });
    }
  }

  /**
   * Show success/error message to user
   */
  function showMessage(message, type) {
    // Remove any existing messages
    var existingMessage = document.querySelector('.form-submit-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    var messageDiv = document.createElement('div');
    messageDiv.className = 'form-submit-message form-submit-' + type;
    messageDiv.style.cssText = 'padding: 15px; margin: 15px 0; border-radius: 4px; font-weight: 500;';

    if (type === 'success') {
      messageDiv.style.backgroundColor = '#d4edda';
      messageDiv.style.color = '#155724';
      messageDiv.style.border = '1px solid #c3e6cb';
    } else {
      messageDiv.style.backgroundColor = '#f8d7da';
      messageDiv.style.color = '#721c24';
      messageDiv.style.border = '1px solid #f5c6cb';
    }

    messageDiv.textContent = message;

    // Insert message after form
    var form = document.getElementById(FORM_SUBMIT_CONFIG.formId);
    if (form && form.parentNode) {
      form.parentNode.insertBefore(messageDiv, form.nextSibling);

      // Auto-remove message after 5 seconds
      setTimeout(function () {
        if (messageDiv.parentNode) {
          messageDiv.style.transition = 'opacity 0.5s';
          messageDiv.style.opacity = '0';
          setTimeout(function () {
            if (messageDiv.parentNode) {
              messageDiv.remove();
            }
          }, 500);
        }
      }, 5000);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormHandler);
  } else {
    initFormHandler();
  }
})();
