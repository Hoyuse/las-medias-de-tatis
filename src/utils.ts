/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Formats a USD price value into a stylized string matching the current global currency setting.
 * 1 USD = 4000 COP for high fidelity local Colombian context.
 */
export function formatPrice(priceInUSD: number, currency: "USD" | "COP"): string {
  if (currency === "COP") {
    const copPrice = priceInUSD * 4000;
    return `$${copPrice.toLocaleString("es-CO")} COP`;
  }
  return `$${priceInUSD.toFixed(2)} USD`;
}
