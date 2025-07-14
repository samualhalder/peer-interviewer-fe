'use client'
import NotificationCard from '@/components/common/NotificationCard'
import { useSocket } from '@/context/SocketContext'
import { listNotificationService } from '@/services/notification.service'
import { NotificationsTypes } from '@/types/notification.types'
import React, { useEffect, useState } from 'react'

export default function Page() {
   const socket=useSocket()
   const [notifications, setNotifications] = useState<NotificationsTypes[]>([])
    useEffect(() => {
        socket?.on('notification',(data)=>{
            setNotifications([data,...notifications])
        })
    }, [notifications,socket])
    useEffect(() => {
        const fetchNotification=async()=>{
            const res=await listNotificationService();
            setNotifications(res)
        }
        fetchNotification()
    }, [])
    return (
        <div className='flex flex-col gap-4'>
            {
                notifications?.map((notification)=>(
                    <NotificationCard notification={notification} key={notification.id}/>
                ))
            }
        </div>
    )
}
