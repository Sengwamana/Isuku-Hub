// Reference to vite/client removed to fix "Cannot find type definition file" error.

declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    GOOGLE_MAPS_API_KEY?: string;
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?: string;
    [key: string]: string | undefined;
  }
}
