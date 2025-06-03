// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
  namespace App {
    interface Locals {
      user: User | null;
      session: Session | null;
    }

    interface User {
      uid: string | null;
      fullName?: string | null;
      profilePhotoURL?: string | null;
    }
    interface Session {
      id: string | null;
    }

    interface Activity {
      id: string;
      groupId: string;
      title: string | undefined;
      description: string | undefined;
      schedule: Date | undefined;
      images: string[] | undefined;
      createdBy: string | undefined;
      participants: {
        min: number | undefined;
        max: number | undefined;
      };
      subscribers: string[];
    }
  }
}

export {};
