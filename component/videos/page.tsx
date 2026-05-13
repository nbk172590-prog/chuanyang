import React from 'react';

function Videos() {
    return (
        <section className="w-full mb-8">

            {/* Header */}
            <div className="my-8 flex items-center justify-between">
                <h2 className="text-[40px] font-bold uppercase tracking-tight text-gray-900 sm:text-2xl">
                    Videos
                </h2>
            </div>

            {/* VIDEO */}
            <div
                className="
                    relative
                    w-full
                    h-[260px]
                    md:h-[420px]
                    lg:h-[544px]
                    overflow-hidden
                    rounded-2xl
                    bg-black
                "
            >

                <video
                    controls
                    preload="metadata"
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-contain
                    "
                >
                    <source
                        src="https://firebasestorage.googleapis.com/v0/b/chuanyang-7973f.firebasestorage.app/o/videos%2FKB12.mp4?alt=media&token=127899f6-29af-46ea-b1a0-4283ed041224"
                        type="video/mp4"
                    />

                    <track
                        src="/path/to/captions.vtt"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                    />
                </video>

            </div>

        </section>
    );
}

export default Videos;