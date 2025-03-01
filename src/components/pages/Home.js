import React, { useEffect, useState } from "react";
import LiveChart from '../blocks/LiveChart'

const Dashboard = () => {


    const [ecg, setEcg] = useState(null)
    const [emg, setEmg] = useState(null)

    const controls = {
        show: true,
        download: true,
        selection: false,
        zoom: false,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
        zoomEnabled: true,
        autoSelected: 'zoom'
    };

  useEffect(() => {
    const fetchData = async () => {

        const url = "https://api.thingspeak.com/channels/2859960/feeds.json?api_key=TFGZZZHBMZY00BWF";


        fetch(url)
        .then(res=>res.json())
        .then(data=>{

            if(data && data.feeds && data.feeds.length>0){
                const xAxis = data.feeds.map(feed=>new Date(feed.created_at).getTime())

                setEcg({
                    "x-axis": xAxis,
                    "y-axis": data.feeds.map(feed=>feed.field1),
                    color: "black",
                    seriesName: 'ECG'
                })

                setEmg({
                    "x-axis": xAxis,
                    "y-axis": data.feeds.map(feed=>feed.field2),
                    color: "black",
                    seriesName: 'EMG'
                })

            }

        })
        .catch(err=>{
            console.log("Error in fetching from Thinkspeak:",err)
        })

    };

    fetchData();

    // Optionally, set up polling for live data updates (e.g., every 30 seconds)
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);




  if(!ecg || !emg){
    return <div>Loading...</div>
  }

  return (
    <div className="container">
      <h1 className="text-center text-primary my-3 fs-2">Sleep Apnea Monitoring</h1>
      

      {/* Charts Section */}
      <div className="charts d-flex flex-wrap justify-content-around gap-2">

        {
            [ecg, emg].map((chartData, i)=>{
                return(
                    <div className="col-11 col-md-10 col-lg-5 col-xl-5 m-2 border rounded" key={i} style={{ marginBottom: "20px" }}>
                        <LiveChart data={[chartData]} title={chartData.seriesName} lineStyle={'straight'} lineWidth={1} chartType={'line'} controls={controls} />
                    </div>
                )
            })
        }

      </div>
    </div>
  );
};

export default Dashboard