export interface SanityImage {
  asset: {
    _id: string;
    url: string;
  };
  hotspot: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}
