'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

import type { TeamBlock } from '@/payload-types'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<TeamBlock['members']>[number]>()

  const label = data?.data?.name
    ? `Integrante ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.name}`
    : 'Integrante'

  return <div>{label}</div>
}
