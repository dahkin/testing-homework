const MockFirestore = {
  getFirestore: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
  addDoc: jest.fn().mockResolvedValue({
    id: jest.fn(),
  }),
  getDocs: jest.fn(),
  getDoc: jest.fn().mockResolvedValue({
    exists: jest.fn(),
    data: jest.fn(),
    id: jest.fn(),
  }),
  Timestamp: {
    now: jest.fn(),
  },
};

export const getFirestore = MockFirestore.getFirestore;
export const doc = MockFirestore.doc;
export const addDoc = MockFirestore.addDoc;
export const getDoc = MockFirestore.getDoc;
export const getDocs = MockFirestore.getDocs;
export const collection = MockFirestore.collection;
export const orderBy = MockFirestore.orderBy;
export const query = MockFirestore.query;
export const Timestamp = MockFirestore.Timestamp;
export default MockFirestore;
