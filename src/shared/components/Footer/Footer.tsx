import CalendarSVG from "../SVGs/calendarSVG";
import FriendsSVG from "../SVGs/FriendsSVG";
import GiftSVG from "../SVGs/GiftSVG";
import GroupsSVG from "../SVGs/GroupsSVG";


export default function Footer ({}) {
return (
<footer className={"flex justify-around items-center p-2 bg-secondary dark:bg-secondary-dark border-t-2"}>
    <div className={"flex flex-col items-center"}>
        <GiftSVG className={"w-8 h-8"} />
        <p className={"text-sm"}>Gifts</p>
    </div>

    <div className={"flex flex-col items-center"}>
        <FriendsSVG className={"w-8 h-8"} />
        <p className={"text-sm"}>Friends</p>
    </div>

    <div className={"flex flex-col items-center"}>
        <GroupsSVG className={"w-8 h-8"} />
        <p className={"text-sm"}>Groups</p>
    </div>

    <div className={"flex flex-col items-center"}>
        <CalendarSVG className={"w-8 h-8"} />
        <p className={"text-sm"}>Calendar</p>
    </div>

</footer>
)
}