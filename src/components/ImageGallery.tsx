import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ImageGalleryProps {
  images: { src: string; alt: string; caption?: string }[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {images.map((img, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-xl cursor-pointer group aspect-video sm:aspect-square"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            onClick={() => setSelected(i)}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs sm:text-sm font-display tracking-wider uppercase">{img.caption}</p>
              </div>
            </div>
            <div className="absolute inset-0 border border-white/0 group-hover:border-primary/30 rounded-xl transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-background/95 backdrop-blur-xl cursor-pointer p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              src={images[selected].src}
              alt={images[selected].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            />
            {images[selected].caption && (
              <motion.div
                className="absolute bottom-6 left-0 right-0 text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs sm:text-sm font-display tracking-widest uppercase text-muted-foreground">{images[selected].caption}</p>
              </motion.div>
            )}
            <motion.button
              className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center bg-background/80 hover:bg-background text-foreground hover:text-primary transition-all"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => { e.stopPropagation(); setSelected(null); }}
            >
              <X size={16} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
