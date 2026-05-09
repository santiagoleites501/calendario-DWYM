
import MonthView from "../components/MonthView";

export default function MonthPage({ months, onOpenPopup, onSelectDay }) {
  return (
    <MonthView
      months={months}
      onAddEvent={onOpenPopup}
      onSelectDay={onSelectDay}
    />
  );
}