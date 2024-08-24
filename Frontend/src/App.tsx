import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
const UploadForm = lazy(() => import("./Pages/UploadForm"));
const TrackOne = lazy(() => import("./Pages/TrackOne"));
const TrackTwo = lazy(() => import("./Pages/TrackTwo"));
const TrackThree = lazy(() => import("./Pages/TrackThree"));
import { VideoProvider } from "./Context/VideoContext";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <VideoProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/uploadFile" element={<UploadForm />} />
              <Route path="/Trackone" element={<TrackOne />} />
              <Route path="/Tracktwo" element={<TrackTwo />} />
              <Route path="/Trackthree" element={<TrackThree />} />
            </Routes>
          </Suspense>
        </VideoProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
