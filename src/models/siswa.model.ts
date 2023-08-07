import mongoose from 'mongoose'

const siswaSchema = new mongoose.Schema(
  {
    siswa_id: {
      type: String,
      unique: true
    },
    nama: {
      type: String
    },
    NIS: {
      type: String
    },
    NISN: {
      type: String
    },
    TTK: {
      type: String
    },
    JK: {
      type: String
    },
    nama_ayah: {
      type: String
    },
    nama_ibu: {
      type: String
    },
    alamat: {
      type: String
    }
  },
  { timestamps: true }
)

const siswaModel = mongoose.model('siswa', siswaSchema)

export default siswaModel
