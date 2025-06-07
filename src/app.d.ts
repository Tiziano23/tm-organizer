// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
  namespace App {
    interface User {
      uid: string | null;
      fullName?: string | null;
      profilePhotoURL?: string | null;
    }

    interface Group {
      id: string;
      name: string;
      users: string[];
    }

    interface Activity {
      id: string | null;
      groupId: string | null;
      title?: string | undefined;
      description?: string | undefined;
      schedule?: Date | undefined;
      images?: string[] | undefined;
      createdBy?: string | undefined;
      participants?: {
        min: number;
        max: number;
      } | undefined;
      subscribers: string[];
    }
  }
}

export {};
