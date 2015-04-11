/*
This is the C code running on the Spark Core 
reading temperature data from a TMP36 and 
humidity from a DHT11

Needs Adafruit_DHT library
 */

// This #include statement was automatically added by the Spark IDE.
#include "Adafruit_DHT/Adafruit_DHT.h"

#define DHTPIN 2     // what pin we're connected to
#define DHTTYPE DHT11		// DHT 11 
 
DHT dht(DHTPIN, DHTTYPE);

double tempC = 0;
int reading = 0;
double voltage = 0.0;

void setup() {
    pinMode(A0, INPUT);
    Serial.begin(9600);
    dht.begin();
}

void loop() {
    
    float h = dht.getHumidity();
   	float t = dht.getTempCelcius();

    reading = analogRead(A0);
    voltage = (reading * 3.3) / 4095;
    tempC = -(voltage - 0.5) * 100;
    
   	String publishString = "{ \"humidity\":"+String(h)+", \"temperature\":"+String(tempC)+" }";
   	Spark.publish("Temp",publishString);
   	
   	delay(1000);
}