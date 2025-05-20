export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message ? (
        <div className="text-green-700 border-l-2 border-green-700 px-4">
          {message.success}
        </div>
      ) : "error" in message ? (
        <div className="text-red-700 border-l-2 border-red-700 px-4">
          {message.error}
        </div>
      ) : (
        <div className="text-gray-700 border-l-2 border-gray-700 px-4">
          {message.message}
        </div>
      )}
    </div>
  );
}