import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard() {
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="120"
                    image="https://1.bp.blogspot.com/-9Q4HCjTaH08/XiJluTvBgrI/AAAAAAAAB5I/e7p4u5dzM0A4OV1IUzfG1F_3TDfDPZgjgCLcBGAsYHQ/s1600/gai-xinh-deo-kinh-3.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                       Friend Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Locations:

                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Accept
                </Button>
                <Button size="small" color="primary">
                    Decline
                </Button>
            </CardActions>
        </Card>
    );
}