package com.example.dobcalculator

import android.app.DatePickerDialog
import android.icu.text.SimpleDateFormat
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit
import java.util.Calendar
import java.util.Locale


class MainActivity : AppCompatActivity() {
    private var tvSelectedDate: TextView?  = null
    private var daysText: TextView? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        tvSelectedDate = findViewById(R.id.showDate)
        daysText = findViewById(R.id.daysText)
        val btnDatePicker : Button = findViewById(R.id.btnDatePicker) // connecting the variable to a specific id.
        btnDatePicker.setOnClickListener {
            clickDatePicker()
        }
        val btnDays : Button = findViewById(R.id.button3)
        btnDays.setOnClickListener( {
            clickDays()
        })
    }
    fun clickDays() {
//        Toast.makeText(this, tvSelectedDays, Toast.LENGTH_LONG).show()
    }
    fun clickDatePicker() {

        val myCalendar = Calendar.getInstance()
        val year = myCalendar.get(Calendar.YEAR)
        val month = myCalendar.get(Calendar.MONTH)
        val day = myCalendar.get(Calendar.DAY_OF_MONTH)
        var yearToDays : Int
        var monthToDays: Int
        val selectedDate =
            DatePickerDialog(this,
                DatePickerDialog.OnDateSetListener{ view, selectedYear, selectedMonth, selectedDayOfMonth ->
                    val selectedDate = "$selectedYear/${selectedMonth + 1}/$selectedDayOfMonth"
                    tvSelectedDate?.setText(selectedDate)

                    val currentDateTime = LocalDateTime.now()
                    val selectedDateTime = LocalDateTime.of(selectedYear, selectedMonth + 1, selectedDayOfMonth,  0 , 0)
                    val minDiff = ChronoUnit.MINUTES.between(selectedDateTime, currentDateTime)
                    daysText?.setText(minDiff.toString())
                },
                year,
                month,
                day
            ).show()


    }
}