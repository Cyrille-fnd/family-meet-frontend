import React from "react";
import s from "./eventsView.module.css"
import SideMenu from "@/components/sideMenu/sideMenu";
import Button from "@/components/form/button/button";
import EventInfos from "@/components/event/event";

interface EventsViewProps {
    id: string
    email: string
    firstname: string
}

const EventsView: React.FC = async ({events}) => {
    return (<>
        <div className={s.container}>
            <SideMenu/>
            <div className={s.listContainer}>
                <Button type="button" value="Créer un évènement"/>
                <EventInfos events={events}/>
            </div>

        </div>
    </>)
}

export default EventsView
