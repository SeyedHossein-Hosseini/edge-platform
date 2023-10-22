import { CardWidgetProps } from 'src/components/share/card-widget/card-widget.props';

export interface HeatmapProps extends CardWidgetProps {
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  separation?: number;
  events?: boolean;
}
