import { Entity, ManyToOne } from 'typeorm'
import { Lazy } from '../../types'
import { BaseTenantEntity } from './base.entity'
import { EntryEntity } from './entry.entity'
import { TagEntity } from './tag.entity'

@Entity()
export class TagEntryXrefEntity extends BaseTenantEntity {
  @ManyToOne(type => TagEntity, tag => tag.entriesXref)
  tag!: Lazy<TagEntity>

  @ManyToOne(type => EntryEntity, entry => entry.tagsXRef)
  entry!: Lazy<EntryEntity>
}
