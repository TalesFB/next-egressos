import { useContext, useState } from "react";
import { AuthUserContext } from "../../contexts/authUserContext";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

import Modal from "react-modal";

// const allNewsList = [
//   {
//     image: "/bg_header.jpg",
//     title: "Título da notícia 1",
//     description: "Uma prévia das informações da notícia 1 aparecerá aqui.",
//   },
//   {
//     image: "/bg_header.jpg",
//     title: "Título da notícia 2",
//     description: "Uma prévia das informações da notícia 2 aparecerá aqui.",
//   },
//   {
//     image: "/bg_header.jpg",
//     title: "Título da notícia 3",
//     description: "Uma prévia das informações da notícia 3 aparecerá aqui.",
//   },
//   {
//     image: "/bg_header.jpg",
//     title: "Título da notícia 4",
//     description: "Uma prévia das informações da notícia 4 aparecerá aqui.",
//   },
//   {
//     image: "/bg_header.jpg",
//     title: "Título da notícia 5",
//     description: "Uma prévia das informações da notícia 5 aparecerá aqui.",
//   },
//   {
//     image: "/bg_header.jpg",
//     title: "Título da notícia 6",
//     description: "Uma prévia das informações da notícia 6 aparecerá aqui.",
//   },
//   {
//     image: "/bg_header.jpg",
//     title: "Título da notícia 7",
//     description: "Uma prévia das informações da notícia 5 aparecerá aqui.",
//   },
//   {
//     image: "/bg_header.jpg",
//     title: "Título da notícia 8",
//     description: "Uma prévia das informações da notícia 6 aparecerá aqui.",
//   },
// ];

const AllNews = () => {
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { newsAll } = useContext(AuthUserContext);
  console.log(newsAll, "Notícias do Firebase");

  const filterNews = search.length
    ? newsAll.filter(({ title }) => title.toUpperCase().includes(search.toUpperCase()))
    : [];

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setModalData(null);
  }

  return (
    <div className="xsm:px-10 xl:px-32 py-10">
      <div className="flex xsm:flex-col md:flex-row lg:flex-row xl:flex-row justify-between xsm:items-start md:items-center lg:items-center xl:items-center">
        <h1 className="xsm:text-24 sm:text-24 lg:text-30 text-title">
          Todas as <span className="text-primary-active">Notícias</span>
        </h1>
        <label className="relative block xsm:mt-5 lg:mt-0 xl:mt-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <SearchOutlined className="text-20 text-title" />
          </span>
          <input
            className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-sm py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-primary-active focus:ring-primary-active focus:ring-1 sm:text-sm"
            placeholder="Buscar..."
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </label>
      </div>
      <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 my-4">
        {search.length
          ? filterNews.map((news, index) => (
              <div
                key={index}
                className="flex flex-col justify-between bg-white rounded-sm p-0 drop-shadow-lg cursor-pointer"
              >
                <div
                  className="flex flex-col"
                  onClick={() => {
                    setModalData(news);
                    openModal();
                  }}
                >
                  <img className="lg:max-h-270" src={news.image} alt="" />
                  <div className="flex flex-col overflow-auto py-2 px-4 text-left space-y-2">
                    <span className="font-medium text-14 text-label-text">{news.title}</span>
                    <p
                      className={`text-12 font-normal min-w-0 xsm:h-40 overflow-hidden`}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {news.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : newsAll?.map((news, index) => (
              <div
                key={index}
                className="flex flex-col justify-between bg-white rounded-sm p-0 drop-shadow-lg cursor-pointer"
              >
                <div
                  className="flex flex-col"
                  onClick={() => {
                    setModalData(news);
                    openModal();
                  }}
                >
                  <img className="lg:max-h-270" src={news.image} alt="" />
                  <div className="flex flex-col overflow-auto py-2 px-4 text-left space-y-2">
                    <span className="font-medium text-14 text-label-text">{news.title}</span>
                    <p
                      className={`text-12 font-normal min-w-0 xsm:h-40 overflow-hidden`}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {news.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        <Modal
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              position: "absolute",
              top: "10%",
              left: "30px",
              right: "30px",
              bottom: "40px",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-medium">{modalData?.title}</p>
            <CloseOutlined className="text-grey-text cursor-pointer" onClick={closeModal} />
          </div>
          <hr />
          <div className="text-13 text-grey-text mt-4w-100">{modalData?.description}</div>
        </Modal>
      </div>
    </div>
  );
};

export default AllNews;
