import React, {useEffect, useState} from "react";
import s from "./eventsList.module.css"
import EventCard from "../eventCard/eventCard";
import { nanoid } from "nanoid";
import Loader from "@/components/common/loader/loader";

interface EventInfosProps {
    events: Event[]
    token: string
}

const EventsList: React.FC<EventInfosProps> = ({events, token}) => {
    const [eventList, setEventList] = useState(events)
    const [currentPage, setCurrentPage] = useState(2)
    const [stopInfiniteScroll, setStopInfiniteScroll] = useState(false)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        const fetchEvents = async (token: string) => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': 'bearer '+token,
                    'Access-Control-Allow-Origin': "*",
                },
            };
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/events?page=' + currentPage, requestOptions)

            const data = await response.json()
            if (data.length === 0) {
                setStopInfiniteScroll(stopInfiniteScroll => !stopInfiniteScroll)
                return
            }
            setEventList(prevData => [...prevData, ...data])
            setCurrentPage(prevPage => prevPage + 1)
            setLoader(loader => !loader)
        }

        const handleScroll = () => {
            const {scrollTop, clientHeight, scrollHeight} = window.document.documentElement
            if (scrollTop + clientHeight === scrollHeight) {
                setLoader(loader => !loader)
                window.removeEventListener('scroll', handleScroll);
                !stopInfiniteScroll && fetchEvents(token)
            }
        }

        window.addEventListener('scroll', handleScroll)
    },[currentPage])

    return (<>
        {eventList.map((event: any, index: number, events: any) =>
            <div className={s.superContainer} key={event.id + nanoid()}>
                {typeof events[index - 1] === 'undefined' || new Date(event.date).getDate() !== new Date(events[index - 1].date).getDate() ? 
                <p>{new Date(event.date).toLocaleDateString('fr-fr', { weekday:"long", year:"numeric", month:"short", day:"numeric"}).toUpperCase()}
                </p>: null
                }
                <EventCard event={event}/>
            </div>)}
        {!stopInfiniteScroll && loader && <Loader />}
    </>)
}

export default EventsList
