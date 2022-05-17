import { ApiResponse } from 'apisauce';
import { showToast } from '@utils/toast';

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: 'timeout'; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: 'cannot-connect'; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: 'server' }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: 'unauthorized' }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: 'forbidden' }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: 'not-found' }
  /**
   * All other 4xx series errors.
   */
  | { kind: 'rejected' }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: 'unknown'; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: 'bad-data' }
  /**
   * Canceled.
   */
  | { kind: 'cancelled' };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: ApiResponse<any>,
): GeneralApiProblem | void {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      showToast('Connection not available.');
      return { kind: 'cannot-connect', temporary: true };
    case 'NETWORK_ERROR':
      showToast('Network not available.');
      return { kind: 'cannot-connect', temporary: true };
    case 'TIMEOUT_ERROR':
      showToast('Request timeout.');
      return { kind: 'timeout', temporary: true };
    case 'SERVER_ERROR':
      showToast('Internal server error.');
      return { kind: 'server' };
    case 'UNKNOWN_ERROR':
      showToast('Unknown error.');
      return { kind: 'unknown', temporary: true };
    case 'CLIENT_ERROR':
      if (response?.data?.message) {
        showToast(response?.data?.message);
      }
      switch (response.status) {
        case 401:
          return { kind: 'unauthorized' };
        case 403:
          return { kind: 'forbidden' };
        case 404:
          return { kind: 'not-found' };
        default:
          return { kind: 'rejected' };
      }
    case 'CANCEL_ERROR':
      showToast('Request cancelled.');
      return { kind: 'cancelled' };
  }
  return;
}
