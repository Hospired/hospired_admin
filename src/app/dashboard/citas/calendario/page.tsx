"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, User } from "lucide-react"
import Link from "next/link"

// Mock calendar data
const calendarEvents = [
  { id: 1, date: 20, time: "09:00", patient: "María González", doctor: "Dr. Ramírez", type: "Consulta" },
  { id: 2, date: 20, time: "10:30", patient: "Carlos Mendoza", doctor: "Dra. Rodríguez", type: "Control" },
  { id: 3, date: 20, time: "14:00", patient: "Ana Rodríguez", doctor: "Dr. García", type: "Prenatal" },
  { id: 4, date: 21, time: "09:30", patient: "José Martínez", doctor: "Dr. López", type: "Traumatología" },
  { id: 5, date: 22, time: "11:00", patient: "Laura Herrera", doctor: "Dra. Morales", type: "Neurología" },
]

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 20)) // January 20, 2024
  const [selectedDate, setSelectedDate] = useState(20)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const getEventsForDate = (date: number) => {
    return calendarEvents.filter((event) => event.date === date)
  }

  const selectedDateEvents = getEventsForDate(selectedDate)

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Calendario de Citas</h1>
          <p className="text-muted-foreground text-pretty">
            Vista de calendario para gestionar y visualizar todas las citas médicas.
          </p>
        </div>
        <Link href="/dashboard/citas/programacion">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Cita
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="p-2 h-20"></div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const date = i + 1
                const events = getEventsForDate(date)
                const isSelected = date === selectedDate
                const isToday = date === 20 // Mock today as 20th

                return (
                  <div
                    key={date}
                    className={`p-2 h-20 border rounded-lg cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : isToday
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="font-medium text-sm">{date}</div>
                    <div className="space-y-1 mt-1">
                      {events.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded truncate ${
                            isSelected
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {event.time}
                        </div>
                      ))}
                      {events.length > 2 && (
                        <div
                          className={`text-xs ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                        >
                          +{events.length - 2} más
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate} de {monthNames[currentDate.getMonth()]}
            </CardTitle>
            <CardDescription>
              {selectedDateEvents.length} cita{selectedDateEvents.length !== 1 ? "s" : ""} programada
              {selectedDateEvents.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{event.time}</p>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {event.patient}
                    </p>
                    <p className="text-sm text-muted-foreground">{event.doctor}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No hay citas programadas para este día</p>
                <Link href="/dashboard/citas/programacion">
                  <Button size="sm" className="mt-4">
                    Programar Cita
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
