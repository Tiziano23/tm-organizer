// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { Bytes, Timestamp } from "firebase/firestore";

declare global {
  namespace App {
    interface Locals {
      userid: string
    }

    interface User {
      uid: string | null;
      fullName?: string | null;
      profilePhotoURL?: string | null;
    }

    interface Group {
      id: string;
      name?: string;
      users?: string[];
    }

    interface Activity {
      id: string;
      groupId: string;
      title?: string;
      description?: string;
      schedule?: Timestamp;
      images?: Bytes[];
      createdBy?: string;
      subscribers?: string[];
      participants?: {
        min: number;
        max: number;
      };
    }
  }
}

export {};
