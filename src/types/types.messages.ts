export interface UploadedFileDetails {
  bucketName: string;
  fileName: string;
  uploadedAt: string;
  size: number;
}

export const FileUploadStatus = {
  PENDING: "pending",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type FileUploadStatus =
  (typeof FileUploadStatus)[keyof typeof FileUploadStatus];

export interface FileUploadState {
  id: string;
  file: File;
  status: FileUploadStatus;
  progress?: number;
  error?: string;
  result?: FileUploaded;
}

export interface FileUploaded {
  id: string;
  creator: string;
  file: UploadedFileDetails;
}

// a message is always stamped and uploaded as a file
export interface Message {
  id: string;
  paymentId?: string;
  text?: string;
  fileId: string;
}

export interface MessageCreate {
  paymentId?: string;
  text?: string;
  filesIds?: string[];
}

export interface MessageRead {
  id: string;
  paymentId?: string;
  text?: string;
  file: UploadedFileDetails;
}

export interface UploadMessagePayload {
  message: MessageCreate;
}

export interface UploadMessageResult {
  message: MessageRead;
  paymentId?: string;
}

export interface GetMessagePayload {
  id: string;
}

export interface DownloadMessagePayload {
  messageId: string;
}

export interface DownloadMessageResult<B> {
  fileName: string;
  contentType: string;
  buffer: B;
}
