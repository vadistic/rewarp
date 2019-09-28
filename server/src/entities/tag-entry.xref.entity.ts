import { BaseTenantEntity } from './base.entity'
import { ManyToOne, Entity } from 'typeorm'
import { TagEntity } from './tag.entity'
import { EntryEntity } from './entry.entity'

@Entity()
export class TagEntryXrefEntity extends BaseTenantEntity {
  @ManyToOne(type => TagEntity, tag => tag.entriesXref)
  tag!: TagEntity

  @ManyToOne(type => EntryEntity, entry => entry.tagsXRef)
  entry!: EntryEntity
}
