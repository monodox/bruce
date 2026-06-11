import { Firestore } from '@google-cloud/firestore'
import type { Playbook } from './gemini.js'

const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'bruce-499005'
const DATABASE_ID = process.env.FIRESTORE_DATABASE || '(default)'

let db: Firestore | null = null

function getDb(): Firestore {
  if (!db) {
    db = new Firestore({
      projectId: PROJECT_ID,
      databaseId: DATABASE_ID,
    })
  }
  return db
}

const COLLECTION = 'playbooks'

export async function savePlaybook(playbook: Playbook): Promise<{ id: string }> {
  try {
    const docRef = await getDb().collection(COLLECTION).add({
      ...playbook,
      createdAt: new Date().toISOString(),
    })
    return { id: docRef.id }
  } catch (error) {
    console.error('Firestore save error:', error)
    // Fallback: return a generated ID if Firestore is not configured
    return { id: `local-${Date.now()}` }
  }
}

export async function getPlaybooks(): Promise<Playbook[]> {
  try {
    const snapshot = await getDb()
      .collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Playbook[]
  } catch (error) {
    console.error('Firestore fetch error:', error)
    return []
  }
}

export async function getPlaybookById(id: string): Promise<Playbook | null> {
  try {
    const doc = await getDb().collection(COLLECTION).doc(id).get()
    if (!doc.exists) return null
    return { id: doc.id, ...doc.data() } as Playbook
  } catch (error) {
    console.error('Firestore fetch error:', error)
    return null
  }
}
