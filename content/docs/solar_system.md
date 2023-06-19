# Solar system implementation

{{< hint info >}}
**Exercise**  
Implement a 3D modelisation of the Sun-Earth-Moon system.
{{< /hint >}}

## Introduction

The phenomenons occuring on our Earth (seasons, day/nights, tides, ...) are phenomenons caused by events occuring in the outer space, more specifically in the Sun-Earth-Moon system. In that sense, to understand them, we must study those external events. However, they can be pretty complex to accept, since they are occuring on a different scale. It is then interesting to build a 3D model of the Sun-Earth-Moon system, with teaching ends, to understand the events at a global scale.

In this exercise, we will then try to implement Earth's different movements around the Sun. 

{{< hint warning >}}
**Scaling changes**  
It is to note that the scales are not realistic. They have voluntarily been changed (size of the objects, distances, speeds), to be able to view better the model.
{{< /hint >}}

## Theoretical notions

As we want to build a model representing laws of physics, it is best to study the different theoretical notions before beginning to modelize the system.

### Earth's movements

The Earth, in the physical world, has four different movements : 
- rotation,
- translation, 
- precession, 
- nutation.

<img src="./../movements.jpg" width="60%" height="60%" style="display:block;float:none;align:center">

{{< tabs "movement" >}}
{{< tab "Rotation" >}}

It is a movement that the Earth does on itself. It rotates with respect to the Y axis, and that is the cause of the daily cycle. Indeed, when some place on the Earth's surface is facing the Sun, it is the day, and when it rotates until not facing the Sun, it comes at night. A full turn is made in 23 hours, 56 minutes and 4 seconds.

<img src="./../rotation.jpg" style="display:block;float:none;align:center">

{{< /tab >}}

{{< tab "Translation" >}}
The translating movement is done around the Sun, in an elliptic way. Combined with the inclination of the Earth, it is the cause of the seasons (the moment in which the Earth is closer to the Sun corresponds to the hotter seasons). A full revolution around the Sun is made in 365 days, 5 hours, 48 minutes and 45 seconds.

<img src="./../translation.jpg" style="display:block;float:none;align:center">
{{< /tab >}}

{{< tab "Precession" >}}
It corresponds to the gradual change our planet has in the orientation of its axis of rotation (that is here considered as the Y axis in the geocentric referential). This axis has currently an inclination of 23,43°. A complete turn turn in the precession axis takes about 25 700 years.

<img src="./../precession.jpg" style="display:block;float:none;align:center">
{{< /tab >}}

{{< tab "Nutation" >}}
This is a slight and irregular movement. It takes place on the axis of rotation of the Earth (Y axis). It is caused by the force exerted by Earth's gravity and the attraction between the planet, the Moon and the Sun.

<img src="./../nutation.jpg" style="display:block;float:none;align:center">
{{< /tab >}}
{{< /tabs >}}


In practical, Earth has an inclination of about 23.4°, which is the cause of the seasons. It is always inclined in the same way (in the heliocentric referential). However, in this model, we could not implement this constant inclination. It is because it would require us to apply a new movement to the Earth already inclined, that could compensate its precession.


### Moon's revolution around the Earth

The Moon effectuates a complete revolution around the Earth in 27.3 days. One particularity about it is that, from Earth, it seems like it doesn't rotate, because we always see the same side of the Moon. However, that is not true. It is only due to the fact that the Moon's rotation on itself (along its rotation axis) **compensates** its rotation around the Earth. The distance of the Moon to Earth varies with time : it goes from 356,500 km at the perigee to 406,700 km at apogee. 

## Implementation

<iframe height = "700" width = "700" src="https://editor.p5js.org/Fafnir/full/khR8vEz6g"></iframe>

## References

### Earth's movement

**Earth movements: rotation, translation, precession and nutation**, German Portillo, https://www.meteorologiaenred.com/en/earth-movements.html
**Earth Rotation: The Day-Night Boundary**, EarthHow, https://earthhow.com/earth-rotation-day-night-boundary/
**Precession**, space.fm, https://www.space.fm/astronomy/planetarysystems/precession.html
**Earth's nutations**, Mathieu Dumberry, https://sites.ualberta.ca/~dumberry/nutation.html

### Moon's movement

**Moon in motion**, NASA, https://moon.nasa.gov/moon-in-motion/phases-eclipses-supermoons/overview/
**Lunar distance**, Wikipedia, https://en.wikipedia.org/wiki/Lunar_distance_(astronomy)

