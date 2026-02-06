---
name: frontend-lead
description: React component development, Next.js App Router patterns, Tailwind styling, shadcn/ui usage, responsive design, and RTL support. Use when building UI components, pages, or fixing frontend issues.
context: fork
agent: frontend-lead
---

## Component Creation Checklist
When creating any new component:
1. Check if shadcn/ui has a suitable base component (`npx shadcn@latest add [component]`)
2. Create in the correct directory under `components/features/[domain]/`
3. Include TypeScript interface for props
4. Handle: loading state, error state, empty state
5. Make responsive (test at 320px, 768px, 1440px widths)
6. Use logical CSS properties for RTL support (ms-, me-, ps-, pe-, text-start)
7. Ensure accessibility: labels, roles, keyboard navigation, focus management

## Page Creation Pattern (Next.js App Router)
```typescript
// app/(dashboard)/groups/[id]/page.tsx

// 1. Server Component by default — fetches data on the server
import { createClient } from '@/lib/supabase/server'
import { GroupHeader } from '@/components/features/groups/group-header'
import { Suspense } from 'react'
import { GroupLeaderboardSkeleton } from '@/components/features/leaderboard/skeleton'

export default async function GroupPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: group } = await supabase
    .from('groups')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!group) return notFound()

  return (
    <div className="container mx-auto px-4 py-6">
      <GroupHeader group={group} />
      {/* Suspense boundary for heavy components */}
      <Suspense fallback={<GroupLeaderboardSkeleton />}>
        <GroupLeaderboard groupId={group.id} />
      </Suspense>
    </div>
  )
}
```

## shadcn/ui Components We Use
Core: Button, Card, Dialog, DropdownMenu, Input, Label, Select, Skeleton, Table, Tabs, Toast, Badge, Avatar, Separator, Sheet (mobile nav)

## Color Scheme
```css
/* Sports-themed with energy */
--primary: 222.2 47.4% 11.2%;      /* Dark navy — trust, professionalism */
--accent: 142.1 76.2% 36.3%;        /* Green — sports field, success */
--destructive: 0 84.2% 60.2%;       /* Red — errors, losses */
--warning: 38 92% 50%;              /* Gold/amber — predictions, odds */
```

## Mobile-First Breakpoints
```
Default:  mobile (320px-767px) — single column, bottom nav, large touch targets
sm:       small tablet (640px+) — slightly wider cards
md:       tablet (768px+) — two-column layout for dashboard
lg:       desktop (1024px+) — sidebar navigation, wider content
xl:       large desktop (1280px+) — max-width container
```
