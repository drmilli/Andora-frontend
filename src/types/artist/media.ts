

export interface MediaResponse {
    id: string
    title: string
    fileUrl: string
    publicId: string
    type: string
    description: string
    isApproved: boolean
    uploadedById: string
    approvedById: string
    createdAt: string
    updatedAt: string
}

export interface UploadMediaPayload {
    file:File | null
    title: string
    description: string

}

export interface GetMediaResponse {
    id: string
    title: string
    fileUrl: string
    publicId: string
    type: string
    description: string
    isApproved: boolean
    uploadedById: string
    approvedById: string
    createdAt: string
    updatedAt: string
    uploadedBy: {
        id: string
        username: string
        firstname: string
        surname: string
        profilePicture: string
    }
}