import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { NotifSSE } from '../components/NotifSSE'
import { NotifSocket } from '../components/NotifSocket'
import { NotifLongPolling } from '../components/NotifLongPolling'
import { NotifShortPolling } from '../components/NotifShortPolling'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
    
    <>
      <NotifShortPolling/>
      <NotifLongPolling/>
      <NotifSSE/>
      <NotifSocket/>
    </>
  )
}
