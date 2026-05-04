import React from 'react';


function Videos() {
    return (
        <section className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Product Video</h2>
            </div>
                <video width="1120" height="544" controls preload="none">
                    <source src="/path/to/video.mp4" type="video/mp4" />
                    <track
                        src="/path/to/captions.vtt"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                    />
                </video>
        </section>
    );
}

export default Videos;