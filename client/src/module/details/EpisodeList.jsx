import React, { useState } from "react";

const EpisodeList = ({ episodes = [] }) => {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleClick = (episode) => {
    setSelectedEpisode(episode);
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-white">Danh sách tập phim</h2>
      <div className="flex flex-wrap gap-3">
        {episodes.map((ep, index) => (
          <button
            key={index}
            onClick={() => handleClick(ep)}
            className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-600"
          >
            {ep.name}
          </button>
        ))}
      </div>

      {selectedEpisode && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-2">{selectedEpisode.name}</h3>
          <div className="aspect-video w-full">
            <iframe
              src={selectedEpisode.link_embed}
              title={selectedEpisode.name}
              allowFullScreen
              className="w-full h-full rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
