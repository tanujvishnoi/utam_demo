/**
 * Enhanced UTAM wrapper that adds better stack trace information to errors
 * This module wraps UTAM page objects to capture and preserve call stacks
 * for better debugging when waitFor timeouts occur.
 */

/**
 * Wraps a UTAM page object to enhance error stack traces
 * @param pageObject - The UTAM page object instance
 * @param capturedStack - The call stack captured at load time
 * @returns Proxied page object with enhanced error handling
 */
export function wrapUtamPageObject<T>(pageObject: T, capturedStack: string | undefined): T {
    return new Proxy(pageObject, {
        get(target: any, prop: PropertyKey): any {
            const value = target[prop];

            // Wrap methods that might throw errors
            if (typeof value === 'function') {
                return function(...args: any[]) {
                    try {
                        const result = value.apply(this, args);

                        // If it's a Promise, wrap the rejection handler
                        if (result && typeof result.catch === 'function') {
                            return result.catch((error: Error) => {
                                // Enhance the error stack with captured call stack
                                if (capturedStack && error && error.stack) {
                                    const errorLines = error.stack.split('\n');
                                    const capturedLines = capturedStack.split('\n').slice(1, 6);

                                    // Only add if spec file isn't already in stack
                                    if (!error.stack.includes('spec/test.spec.ts')) {
                                        error.stack = errorLines[0] + '\n' +
                                            errorLines.slice(1).join('\n') +
                                            '\n\nCalled from (test source):\n' +
                                            capturedLines.join('\n');
                                    }
                                }
                                throw error;
                            });
                        }

                        return result;
                    } catch (error) {
                        // Enhance synchronous errors too
                        if (capturedStack && error instanceof Error && error.stack) {
                            const capturedLines = capturedStack.split('\n').slice(1, 6);
                            if (!error.stack.includes('spec/test.spec.ts')) {
                                error.stack = error.stack + '\n\nCalled from (test source):\n' +
                                    capturedLines.join('\n');
                            }
                        }
                        throw error;
                    }
                };
            }

            return value;
        }
    });
}

/**
 * Enhanced utam.load() that wraps page objects with stack trace enhancement
 * Usage: Instead of `await utam.load(demo)`, use `await utamEnhanced.load(demo)`
 *
 * @param pageObject - The UTAM page object definition
 * @returns Wrapped page object with enhanced error handling
 */
export async function load<T>(pageObject: T): Promise<T> {
    // Capture the call stack at the point load() is called
    // This preserves the spec file location
    const capturedStack = new Error().stack;

    // Call the original utam.load()
    const instance = await (utam as any).load(pageObject);

    // Wrap the instance to enhance error handling
    return wrapUtamPageObject(instance, capturedStack);
}

/**
 * Export wrapper with all UTAM methods available
 */
export const utamEnhanced = {
    load
};

export default utamEnhanced;
