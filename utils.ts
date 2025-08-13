
import { CartItem } from './types';

/**
 * Encodes an array of CartItem objects into a base64 string.
 * This is useful for creating shareable cart links.
 *
 * @param cartItems - The array of CartItem objects to encode.
 * @returns A base64 encoded string representing the cart, or an empty string on error.
 */
export const encodeCartToString = (cartItems: CartItem[]): string => {
  try {
    const jsonString = JSON.stringify(cartItems);
    // Use btoa for base64 encoding in browser environments
    return btoa(unescape(encodeURIComponent(jsonString)));
  } catch (error) {
    console.error("Error encoding cart to string:", error);
    return '';
  }
};

/**
 * Decodes a base64 string back into an array of CartItem objects.
 * This is used to parse a shared cart from a URL parameter.
 *
 * @param encodedString - The base64 encoded string representing the cart.
 * @returns An array of CartItem objects if decoding and parsing are successful, otherwise null.
 */
export const decodeCartFromString = (encodedString: string): CartItem[] | null => {
  try {
    // Use atob for base64 decoding in browser environments
    const jsonString = decodeURIComponent(escape(atob(encodedString)));
    const parsed = JSON.parse(jsonString);

    if (Array.isArray(parsed)) {
      // Basic validation for each item to ensure it resembles a CartItem
      const isValidCart = parsed.every(item =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.productId === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'string' && // Price is kept as string in Product/CartItem
        typeof item.quantity === 'number' && item.quantity > 0
        // imagePreviewUrl is optional, so not strictly checked here for existence
      );

      if (isValidCart) {
        return parsed as CartItem[];
      } else {
        console.warn("Decoded cart string contains invalid item structures:", parsed);
        return null;
      }
    }
    console.warn("Decoded cart string is not an array:", parsed);
    return null;
  } catch (error) {
    console.error("Error decoding cart from string:", error, "Input string:", encodedString);
    return null;
  }
};

/**
 * Replaces placeholders in a template string with values from a data object.
 * Placeholders are in the format {key}.
 *
 * @param template - The template string with placeholders.
 * @param data - An object where keys correspond to placeholders and values are their replacements.
 * @returns The string with placeholders replaced.
 */
export const replacePlaceholders = (template: string, data: Record<string, string | number | undefined>): string => {
  let result = template;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const placeholder = `{${key}}`;
      // Ensure data[key] is a string for replacement, or an empty string if undefined
      const replacementValue = data[key] !== undefined ? String(data[key]) : '';
      result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacementValue);
    }
  }
  return result;
};
