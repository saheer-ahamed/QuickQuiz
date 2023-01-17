import { Route, Routes } from "react-router-dom";
import EachQuestion from "./components/EachQuestion";
import Landing from "./components/Landing";
import QuestionNos from "./components/QuestionNos";
import Result from "./components/Result";
import Layout from "./pages/Layout/Layout";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Landing />} />
          <Route path="choose-question-numbers" element={<QuestionNos />} />
          <Route path="question" element={<EachQuestion />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
    </>
  )
}