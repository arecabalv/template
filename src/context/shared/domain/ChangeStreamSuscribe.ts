import { ChangeStreamDocument } from 'mongodb';

export interface ChangeStreamSuscribe {
  onChange(changeEvent: ChangeStreamDocument): Promise<void>;
}
