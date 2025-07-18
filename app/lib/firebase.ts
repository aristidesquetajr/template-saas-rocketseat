import { env } from '@/env'
import { initFirestore } from '@auth/firebase-adapter'
import { cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
// import { getStorage } from 'firebase-admin/storage'
import 'server-only'

export const firestore = initFirestore({
  credential: cert({
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
  })
  //storageBucket: env.FIREBASE_STORAGE_BUCKET,
})

export const db = getFirestore()
// export const storage = getStorage().bucket()
// Uncomment the line below if you need to use Firebase Storage
