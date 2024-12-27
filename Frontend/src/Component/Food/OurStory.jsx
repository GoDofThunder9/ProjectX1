import React from 'react';
import { TextField, Button, Card, CardContent, CardHeader, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import '../../assets/Style/Food/OurStory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope,faUtensils } from '@fortawesome/free-solid-svg-icons';
export default function OurStory() {
  return (
    <div className="our-story-container">
      <div className="our-story-grid">
        {/* Story Section */}
        <div className="story-section">
          <h2 className="story-title">Our Story</h2>
          <h3 className="story-subtitle">
            Until I discovered cooking I was never really interested in anything
          </h3>
          <p className="story-text">
            Pleased anxious or as in by viewing forbade minutes prevent. Too leave had those get being led weeks blind. Had men rose from down lady able. Its son him ferrars proceed six parlors.
          </p>
          <p className="story-text">
            Advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket.
          </p>
          
          <div className="contact-grid">
            <div className="contact-item">
                <FontAwesomeIcon icon={faPhone} className='iconsphone'/>
                <div className="contact-title">PHONE</div>
                <div className="contact-detail">+123 456 7890</div>
            </div>
            <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className='iconsphone'/>
                <div className="contact-title">EMAIL</div>
                <div className="contact-detail">support@restcafe.com</div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <Card className="booking-form">
          <div className="icon-badge">
           <FontAwesomeIcon icon={faUtensils} className="badge-icon" />
          </div>
          <CardHeader title="BOOK A TABLE" className="booking-title" />
          <CardContent>
            <form className="form-grid">
              <TextField fullWidth label="Name" variant="outlined" />
              <TextField fullWidth label="Email" type="email" variant="outlined" />
              <FormControl fullWidth>
                <InputLabel id="people-select-label">Number of People</InputLabel>
                <Select
                  labelId="people-select-label"
                  defaultValue="1"
                  label="Number of People"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} {num === 1 ? 'Person' : 'People'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField fullWidth type="date" variant="outlined" InputLabelProps={{ shrink: true }} />
              <Button variant="contained" color="error" fullWidth>
                BOOK NOW
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
