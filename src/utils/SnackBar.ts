/**
 * @format
 */
import { showMessage, MessageOptions } from 'react-native-flash-message';

export function showSnackbar(props: MessageOptions) {
  const { message = 'Plese Check your Network Connection.', type = 'success', ...rest } = props;
  showMessage({ message, type, ...rest });
}
