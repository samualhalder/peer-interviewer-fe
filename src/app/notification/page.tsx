'use client'
import NotificationCard from '@/components/common/NotificationCard'

import { set } from '@/redux/notificationSlice'
import { RootState } from '@/redux/store'

import { listNotificationService } from '@/services/notification.service'

import React, {  useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


export default function Page() {
    const dispatch=useDispatch();
    const notifications=useSelector((state:RootState)=>state.notifications.notifications)
    useEffect(() => {
        const fetchNotification=async()=>{
            const res=await listNotificationService();
            dispatch(set({count:res.count,notifications:res.notifications}))
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
