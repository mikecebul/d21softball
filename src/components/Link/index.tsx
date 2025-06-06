'use client'

import { Button, buttonVariants, type ButtonProps } from '@/components/ui/button'
import { cn } from 'src/utilities/cn'
import Link from 'next/link'
import React from 'react'

import type { Page, Media, Update } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | 'sidebar' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null | React.ReactNode
  newTab?: boolean | null
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | React.MouseEventHandler<HTMLButtonElement>
  reference?: {
    relationTo: 'pages' | 'media' | 'updates'
    value: Page | Media | Update | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    onClick,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object'
      ? reference?.relationTo === 'media' && 'url' in reference.value
        ? reference.value.url // Use the URL from the Media object
        : reference?.relationTo === 'pages' && 'slug' in reference.value
          ? `/${reference.value.slug}` // Use the slug from the Page object
          : reference?.relationTo === 'updates' && 'slug' in reference.value
            ? `/updates/${reference.value.slug}` // Use the slug from the Update object
            : null
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Don't add any styling, just handle the link logic */
  if (appearance === 'sidebar') {
    return (
      <Link
        href={href || url || ''}
        {...newTabProps}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children || label}
      </Link>
    )
  }

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link
        className={cn(className)}
        href={href || url || ''}
        {...newTabProps}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  if (appearance === 'card') {
    return (
      <Link className={cn('object-top', className)} href={href || url || ''} {...newTabProps}>
        {children && children}
      </Link>
    )
  }

  return (
    <Button
      asChild
      className={cn(
        'min-w-full sm:min-w-64',
        {
          'min-w-0 sm:min-w-0': appearance === 'nav',
        },
        className,
      )}
      size={size}
      variant={appearance}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      <Link
        className={cn(className, buttonVariants({ variant: appearance ?? 'default' }))}
        href={href || url || ''}
        {...newTabProps}
      >
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
