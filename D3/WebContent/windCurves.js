
    var offset; //variable for defining distance between parallel curves as a wind
    
    //find the destination coordinate of randomly plotted points
    function plotTheLinesForY(y1,ratio,x1,x2){
      var temp=[],
          y2 = y1 - (ratio * (x2-x1)); 
      temp.push([x1,y1]);
      temp.push([x2,y2]);
      return temp;
    }

    function plotTheLinesForX(x1,ratio,y1,y2){
      var temp=[],
          x2 = ((y1-y2)/ratio)+ x1;
      temp.push([x1,y1]);
      temp.push([x2,y2]);
      return temp;
    }

    //this is to find the angle between two lines in the space
    function findAngleBetween(firstLine,secondLine,slope1,slope2){
      var firstAngle = Math.atan(slope1)*(180/Math.PI),
          secondAngle = Math.atan(slope2)*(180/Math.PI);
          sameQuadrant=false,
          angleBetweenThem = firstAngle - secondAngle;

      if(firstAngle==90||secondAngle==90){
          if(firstAngle==90){
            var runForSecondLine = secondLine[1][0]-secondLine[0][0];
            if(runForSecondLine>=0){
                if(secondAngle>=0){
                  return -10;
                }else{
                  return 10;
                }
            }else{
                if(secondAngle>=0){
                  return 10;
                }else{
                  return -10;
                }
            }
          }else{
            var runForFirstLine = firstLine[1][0]-firstLine[0][0];
            if(runForFirstLine>=0){
                if(firstAngle>=0){
                  return -10;
                }else{
                  return 10;
                }
            }else{
                if(firstAngle>=0){
                  return 10;
                }else{
                  return -10;
                }
            }
          }

      }else if(firstAngle==-90||secondAngle==-90){
          if(firstAngle==-90){
            var runForSecondLine = secondLine[1][0]-secondLine[0][0];
            if(runForSecondLine>=0){
                if(secondAngle>=0){
                  return 10;
                }else{
                  return -10;
                }
            }else{
                if(secondAngle>=0){
                  return -10;
                }else{
                  return 10;
                }
            }
          }else{
            var runForFirstLine = firstLine[1][0]-firstLine[0][0];
            if(runForFirstLine>=0){
                if(firstAngle>=0){
                  return 10;
                }else{
                  return -10;
                }
            }else{
                if(firstAngle>=0){
                  return -10;
                }else{
                  return 10;
                }
            }
          }
      }else if(firstAngle==0||secondAngle==0){
        if(firstAngle==0){
            var riseForSecondLine = secondLine[0][1]-secondLine[1][1];
            if(riseForSecondLine>=0){
                if(secondAngle>=0){
                  return -10;
                }else{
                  return 10;
                }
            }else{
                if(secondAngle>=0){
                  return 10;
                }else{
                  return -10;
                }
            }
          }else{
            var riseForFirstLine = firstLine[0][1]-firstLine[1][1];
            if(riseForFirstLine>=0){
                if(firstAngle>=0){
                  return -10;
                }else{
                  return 10;
                }
            }else{
                if(firstAngle>=0){
                  return 10;
                }else{
                  return -10;
                }
            }
          }
      }else if(firstAngle==-0||secondAngle==-0){
        if(firstAngle==-0){
            var riseForSecondLine = secondLine[0][1]-secondLine[1][1];
            if(riseForSecondLine>=0){
                if(secondAngle>=0){
                  return 10;
                }else{
                  return -10;
                }
            }else{
                if(secondAngle>=0){
                  return -10;
                }else{
                  return 10;
                }
            }
          }else{
            var riseForFirstLine = firstLine[0][1]-firstLine[1][1];
            if(riseForFirstLine>=0){
                if(firstAngle>=0){
                  return 10;
                }else{
                  return -10;
                }
            }else{
                if(firstAngle>=0){
                  return -10;
                }else{
                  return 10;
                }
            }
          }
      }else{
          if(angleBetweenThem<0){
            return angleBetweenThem;
          }
          else{
                var xFirstLine = firstLine[1][0]-firstLine[0][0],
                    yFirstLine = firstLine[0][1]-firstLine[1][1],
                    xSecondLine = secondLine[1][0]-secondLine[0][0],
                    ySecondLine = secondLine[0][1]-secondLine[1][1];

                if((xFirstLine>=0 && yFirstLine>=0) && (xSecondLine>=0 && ySecondLine>=0)){
                  sameQuadrant =true;
                }else if ((xFirstLine<0 && yFirstLine>=0) && (xSecondLine<0 && ySecondLine>=0)){
                  sameQuadrant =true;
                }else if ((xFirstLine<0 && yFirstLine<0) && (xSecondLine<0 && ySecondLine<0)){
                  sameQuadrant =true;
                }else if ((xFirstLine>=0 && yFirstLine<0) && (xSecondLine>=0 && ySecondLine<0)){
                  sameQuadrant =true;
                }       
          }

          if(sameQuadrant==true){
            if((firstLine[1][0]==secondLine[0][0])&& (firstLine[1][1]==secondLine[0][1])){return angleBetweenThem-180;}
          }
        }
      
      return angleBetweenThem;
      
    }

    //this is to find whether the line lies in right or left of a line
    function findLeftOrRightByX(value,lineToCheck,indicator){
      var slopeOfLineToCheck = (lineToCheck[0][1]-lineToCheck[1][1]) / (lineToCheck[1][0]-lineToCheck[0][0]),
          referenceX,x;

      if(indicator=="upwards"){
          referenceX = value[0][0];
          x = plotTheLinesForX(lineToCheck[0][0],slopeOfLineToCheck,lineToCheck[0][1],value[0][1])[1][0];

      }else if(indicator=="downwards"){
          referenceX = value[1][0];
          x = lineToCheck[1][0] - ((value[1][1]-lineToCheck[1][1])/slopeOfLineToCheck);
      }

      if((x - referenceX)<0){
        return "left";
      }else{
        return "right";
      }
          
    }

    //this is to find whether the line lies above or below a line
    function findUpOrDownByY(value,lineToCheck,indicator){
      var slopeOfLineToCheck = (lineToCheck[0][1]-lineToCheck[1][1]) / (lineToCheck[1][0]-lineToCheck[0][0]),
          referenceY,y;
    if(indicator=="upwards"){
      referenceY = value[0][1];
      y = plotTheLinesForY(lineToCheck[0][1],slopeOfLineToCheck,lineToCheck[0][0],value[0][0])[1][1];

    }else if(indicator="downwards"){
      referenceY = value[1][1];
      y = (slopeOfLineToCheck *(lineToCheck[1][0]-lineToCheck[0][0])) + lineToCheck[1][1];
    }

    if((y - referenceY)>0){
      return "below";

    }else{
      return "above";
    }

    }

    //creates random particles for line other than first and last line by connecting to the points from the last lines
    function createParticlesForMiddleLine(value,xMin,xMax,yMin,yMax,value,tanRatio,nextLine,previousLine){
        var slopeOfNextLine =  (nextLine[0][1]-nextLine[1][1]) / (nextLine[1][0]-nextLine[0][0]),
            slopeOfPreviousLine = (previousLine[0][1]-previousLine[1][1])/(previousLine[1][0]-previousLine[0][0]),
            particles = [];

        //when the slope of line is greater than 45 degrees
        if(Math.abs(Math.atan(tanRatio)*(180/Math.PI)) > 45){

                   //acute and acute angles
          if(((Math.round(slopeOfPreviousLine*tanRatio)==-1) || (findAngleBetween(previousLine,value,slopeOfPreviousLine,tanRatio)>0)) &&
            ((Math.round(slopeOfNextLine*tanRatio)==-1) || (findAngleBetween(value,nextLine,tanRatio,slopeOfNextLine)>0))){

              if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) < 45) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) < 45)){

                if((value[0][1]-value[1][1])>=0){

                    if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])<0){
                      var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }
                      }else if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])>=0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }

                      }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])>=0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }

                      }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])<0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }

                      }

                    }else{

                      if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])<0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }
                      }else if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])>=0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }

                      }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])>=0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }

                      }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])<0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }

                      }
                    }
              }else if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) < 45) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45)){


                if((value[0][1]-value[1][1])>=0){

                    if((previousLine[1][0]-previousLine[0][0])>=0){

                        if((findLeftOrRightByX(value,nextLine,"upwards"))=="left"){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }

                        }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }

                        }
                        
                    }else if((previousLine[1][0]-previousLine[0][0])<0){
                      if((findLeftOrRightByX(value,nextLine,"upwards"))=="left"){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }

                        }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }

                        }
                    }
                  }else{

                      if((previousLine[1][0]-previousLine[0][0])>=0){

                        if((findLeftOrRightByX(value,nextLine,"upwards"))=="left"){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }

                        }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }

                        }
                        
                    }else if((previousLine[1][0]-previousLine[0][0])<0){
                      if((findLeftOrRightByX(value,nextLine,"upwards"))=="left"){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }

                        }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }

                        }
                    }
                  }
              }
              else if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) < 45)){


                if((value[0][1]-value[1][1])>=0){
                    if((nextLine[1][0]-nextLine[0][0])<0){
                        if((findLeftOrRightByX(value,previousLine,"downwards"))=="left"){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }
                          }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }
                          }
                        }else if((nextLine[1][0]-nextLine[0][0])>=0){
                          if((findLeftOrRightByX(value,previousLine,"downwards"))=="left"){
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                      particles.push(line);
                              }
                            }else{
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                      particles.push(line);
                              }
                            }
                        }
                      }else{
                          if((nextLine[1][0]-nextLine[0][0])<0){
                              if((findLeftOrRightByX(value,previousLine,"downwards"))=="left"){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                }else{
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                }
                              }else if((nextLine[1][0]-nextLine[0][0])>=0){
                                if((findLeftOrRightByX(value,previousLine,"downwards"))=="left"){
                                    var p=offset,counter=1;
                                    // plot for left side
                                    for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                        var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                            particles.push(line);
                                    }
                                    counter=1;
                                    // plot for right side
                                    for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                        var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                            particles.push(line);
                                    }
                                  }else{
                                    var p=offset,counter=1;
                                    // plot for left side
                                    for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                        var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                            particles.push(line);
                                    }
                                    counter=1;
                                    // plot for right side
                                    for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                        var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                            particles.push(line);
                                    }
                                  }
                              }
                      }
              }
              else if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45)){


                if((value[0][1]-value[1][1])>=0){
                 
                      if((findLeftOrRightByX(value,previousLine,"downwards")=="left") && (findLeftOrRightByX(value,nextLine,"upwards")=="left")){
                           var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }
                        }else if((findLeftOrRightByX(value,previousLine,"downwards")=="left") && (findLeftOrRightByX(value,nextLine,"upwards")=="right")){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }

                        }else if((findLeftOrRightByX(value,previousLine,"downwards")=="right") && (findLeftOrRightByX(value,nextLine,"upwards")=="left")){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }

                        }else if((findLeftOrRightByX(value,previousLine,"downwards")=="right") && (findLeftOrRightByX(value,nextLine,"upwards")=="right")){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }

                        }
                    }else{

                    if((findLeftOrRightByX(value,previousLine,"downwards")=="left") && (findLeftOrRightByX(value,nextLine,"upwards")=="left")){
                       var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }
                    }else if((findLeftOrRightByX(value,previousLine,"downwards")=="left") && (findLeftOrRightByX(value,nextLine,"upwards")=="right")){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }

                    }else if((findLeftOrRightByX(value,previousLine,"downwards")=="right") && (findLeftOrRightByX(value,nextLine,"upwards")=="left")){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }

                    }else if((findLeftOrRightByX(value,previousLine,"downwards")=="right") && (findLeftOrRightByX(value,nextLine,"upwards")=="right")){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }

                    }

                  }
              }

          } //acute and obtuse angles 
          else if(((Math.round(slopeOfPreviousLine*tanRatio)==-1) || (findAngleBetween(previousLine,value,slopeOfPreviousLine,tanRatio)>0)) &&
            ((findAngleBetween(value,nextLine,tanRatio,slopeOfNextLine)<0))){


                    if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                      
                      if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){

                          if((value[0][1]-value[1][1])>=0){

                              if(findLeftOrRightByX(value,previousLine,"downwards")=="left"){
                                 var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                        particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                        particles.push(line);
                                }

                              }else{

                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                        particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                        particles.push(line);
                                }
                              }
                            }else{

                              if(findLeftOrRightByX(value,previousLine,"downwards")=="left"){
                                 var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                        particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                        particles.push(line);
                                }

                              }else{

                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                        particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                        particles.push(line);
                                }
                              }


                            }
                      }
                      else{

                        if((value[0][1]-value[1][1])>=0){

                            if(findLeftOrRightByX(value,previousLine,"downwards")=="left"){

                              if((nextLine[1][0]-nextLine[0][0])>=0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                }else{
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }

                                }
                            }else{
                              if((nextLine[1][0]-nextLine[0][0])>=0){
                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                                }
                              }else{
                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                                }
                              }
                          }

                        }else{

                          if(findLeftOrRightByX(value,previousLine,"downwards")=="left"){

                              if((nextLine[1][0]-nextLine[0][0])>=0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                }else{
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }

                                }
                            }else{
                              if((nextLine[1][0]-nextLine[0][0])>=0){
                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                                }
                              }else{
                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                                }
                              }
                          }
                        }

                        }

                    }else{

                      if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                  
                          if((value[0][1]-value[1][1])>=0){

                            if((previousLine[1][0]-previousLine[0][0])<0){
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                      particles.push(line);
                              }

                            }else if((previousLine[1][0]-previousLine[0][0])>=0){
                              
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                      particles.push(line);
                              }
                            }
                          }else{
                            if((previousLine[1][0]-previousLine[0][0])<0){
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                      particles.push(line);
                              }

                            }else if((previousLine[1][0]-previousLine[0][0])>=0){
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                      particles.push(line);
                              }
                            }
                          }

                        }
                        else{

                          if((value[0][1]-value[1][1])>=0){
                          
                                if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])<0){
                                var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                }else if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])>=0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }

                                }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])>=0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }

                                }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])<0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }

                                }
                            }else{

                                if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])<0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                }else if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])>=0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }

                                }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])>=0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }

                                }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])<0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }

                                }
                            }
                        }
                    }

          }//obtuse and acute angles
          else if((findAngleBetween(previousLine,value,slopeOfPreviousLine,tanRatio)<0) &&
            ((Math.round(slopeOfNextLine*tanRatio)==-1) || (findAngleBetween(value,nextLine,tanRatio,slopeOfNextLine)>0))){

                if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){

                    if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){

                      if((value[0][1]-value[1][1])>=0){
                          if(findLeftOrRightByX(value,nextLine,"upwards")=="left"){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var line = plotTheLinesForX(value[0][0]-(counter*offset),tanRatio,value[0][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var line = plotTheLinesForX(value[0][0]+(counter*offset),tanRatio,value[0][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }

                          }else{
                             var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]-(counter*offset),tanRatio,value[0][1],value[1][1]-(counter*offset));
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]+(counter*offset),tanRatio,value[0][1],value[1][1]+(counter*offset));
                                      particles.push(line);
                              }
                          }
                        }else{
                          if(findLeftOrRightByX(value,nextLine,"upwards")=="left"){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var line = plotTheLinesForX(value[0][0]-(counter*offset),tanRatio,value[0][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var line = plotTheLinesForX(value[0][0]+(counter*offset),tanRatio,value[0][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }

                          }else{
                             var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]-(counter*offset),tanRatio,value[0][1],value[1][1]+(counter*offset));
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]+(counter*offset),tanRatio,value[0][1],value[1][1]-(counter*offset));
                                      particles.push(line);
                              }
                          }
                        }

                    }else{

                      if((value[0][1]-value[1][1])>=0){

                          if((nextLine[1][0]-nextLine[0][0])<0){
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]-(counter*offset),tanRatio,value[0][1],value[1][1]+(counter*offset));
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]+(counter*offset),tanRatio,value[0][1],value[1][1]-(counter*offset));
                                      particles.push(line);
                              }
                            }else{
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]-(counter*offset),tanRatio,value[0][1],value[1][1]-(counter*offset));
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]+(counter*offset),tanRatio,value[0][1],value[1][1]+(counter*offset));
                                      particles.push(line);
                              }
                          }
                        }else{

                          if((nextLine[1][0]-nextLine[0][0])<0){
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]-(counter*offset),tanRatio,value[0][1],value[1][1]-(counter*offset));
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]+(counter*offset),tanRatio,value[0][1],value[1][1]+(counter*offset));
                                      particles.push(line);
                              }
                            }else{
                              var p=offset,counter=1;
                              // plot for left side
                              for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]-(counter*offset),tanRatio,value[0][1],value[1][1]+(counter*offset));
                                      particles.push(line);
                              }
                              counter=1;
                              // plot for right side
                              for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var line = plotTheLinesForX(value[0][0]+(counter*offset),tanRatio,value[0][1],value[1][1]-(counter*offset));
                                      particles.push(line);
                              }
                          }
                        }
                    }
                  }
                  else{
                    if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){

                        if((value[0][1]-value[1][1])>=0){
        
                          if(findLeftOrRightByX(value,nextLine,"upwards")=="left"){
                              if((previousLine[1][0]-previousLine[0][0])>=0){
                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                            particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                            particles.push(line);
                                }
                              }else{
                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                            particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                            particles.push(line);
                                }
                              }
                        
                      }else{

                        if((previousLine[1][0]-previousLine[0][0])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                            }
                          }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                            }
                          }
                      }
                    }else{
                            if(findLeftOrRightByX(value,nextLine,"upwards")=="left"){
                              if((previousLine[1][0]-previousLine[0][0])>=0){
                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                            particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                            particles.push(line);
                                }
                              }else{
                                var p=offset,counter=1;
                                // plot for left side
                                for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                            particles.push(line);
                                }
                                counter=1;
                                // plot for right side
                                for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                            particles.push(line);
                                }
                              }
                        
                      }else{

                        if((previousLine[1][0]-previousLine[0][0])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                            }
                          }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                            }
                          }
                      }
                    }
                    }else{

                      if((value[0][1]-value[1][1])>=0){

                        if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])<0){
                          var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }
                          }else if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                    particles.push(line);
                            }

                          }
                        }else{

                              if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])<0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                }else if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])>=0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }

                                }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])>=0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }

                                }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])<0){
                                  var p=offset,counter=1;
                                  // plot for left side
                                  for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                          particles.push(line);
                                  }
                                  counter=1;
                                  // plot for right side
                                  for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                      var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                          particles.push(line);
                                  }

                                }
                        }
                      }
                  }
          }//obtuse and obtuse angles
          else{
                if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45 ) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45 )){
            
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                        var line = plotTheLinesForX(value[0][0]-(counter*offset),tanRatio,value[0][1],value[1][1]);
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                        var line = plotTheLinesForX(value[0][0]+(counter*offset),tanRatio,value[0][1],value[1][1]);
                            particles.push(line);
                    }

                }
                else if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45 ) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) <45 )){

                  if((value[0][1]-value[1][1])>=0){

                        if((nextLine[1][0]-nextLine[0][0])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var line = plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var line = plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                            }
                      }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var line = plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var line = plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                            }

                      }
                    }else{
                      if((nextLine[1][0]-nextLine[0][0])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var line = plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var line = plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                            }
                      }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                var line = plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+(counter*offset));
                                        particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                var line = plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-(counter*offset));
                                        particles.push(line);
                            }

                      }
                    }
       
              }
              else if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) < 45 ) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) <45 )){

                  if((value[0][1]-value[1][1])>=0){

                    if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])<0){
                      var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                particles.push(line);
                        }
                    }else if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])>=0){
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                              particles.push(line);
                      }

                    }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])>=0){
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                              particles.push(line);
                      }

                    }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])<0){
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                              particles.push(line);
                      }
                    }
                  }else{
                        if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }
                        }else if((previousLine[1][0]-previousLine[0][0])>=0 && (nextLine[1][0]-nextLine[0][0])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }

                        }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }

                        }else if((previousLine[1][0]-previousLine[0][0])<0 && (nextLine[1][0]-nextLine[0][0])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]+(counter*offset));
                                  particles.push(line);
                          }

                        }
                  }
              }
              else if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) < 45 ) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) >45 )){

                  if((value[0][1]-value[1][1])>=0){

                      if((previousLine[1][0]-previousLine[0][0])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                  particles.push(line);
                          }

                      }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                  particles.push(line);
                          }
                    }
                  }else{

                    if((previousLine[1][0]-previousLine[0][0])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                  particles.push(line);
                          }

                      }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                                  particles.push(line);
                          }
                    }
                  }
             }

          }

        }//when the slope of line is less than 45 degrees
        else{
          //acute and acute angles
          if(((Math.round(slopeOfPreviousLine*tanRatio)==-1) || (findAngleBetween(previousLine,value,slopeOfPreviousLine,tanRatio)>0)) &&
            ((Math.round(slopeOfNextLine*tanRatio)==-1) || (findAngleBetween(value,nextLine,tanRatio,slopeOfNextLine)>0))){

            if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) < 45) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) < 45)){

              if(value[1][0]-value[0][0]<0){
                if((findUpOrDownByY(value,previousLine,"downwards")=="below") && (findUpOrDownByY(value,nextLine,"upwards")=="above")){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                            particles.push(line);
                    }

                }else if((findUpOrDownByY(value,previousLine,"downwards")=="below") && (findUpOrDownByY(value,nextLine,"upwards")=="below")){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                            particles.push(line);
                    }

                }else if((findUpOrDownByY(value,previousLine,"downwards")=="above") && (findUpOrDownByY(value,nextLine,"upwards")=="above")){
                   var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                            particles.push(line);
                    }

                }else if((findUpOrDownByY(value,previousLine,"downwards")=="above") && (findUpOrDownByY(value,nextLine,"upwards")=="below")){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                            particles.push(line);
                    }

                }
              }else{
                   if((findUpOrDownByY(value,previousLine,"downwards")=="below") && (findUpOrDownByY(value,nextLine,"upwards")=="above")){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                            particles.push(line);
                    }

                }else if((findUpOrDownByY(value,previousLine,"downwards")=="below") && (findUpOrDownByY(value,nextLine,"upwards")=="below")){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                            particles.push(line);
                    }

                }else if((findUpOrDownByY(value,previousLine,"downwards")=="above") && (findUpOrDownByY(value,nextLine,"upwards")=="above")){
                   var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                            particles.push(line);
                    }

                }else if((findUpOrDownByY(value,previousLine,"downwards")=="above") && (findUpOrDownByY(value,nextLine,"upwards")=="below")){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                            particles.push(line);
                    }
                }

              }
       
              }else if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) < 45) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45)){

                 if(value[1][0]-value[0][0]<0){

                    if(findUpOrDownByY(value,previousLine,"downwards")=="below"){
                      if((nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }

                      }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }

                      }
                    }else{
                      if((nextLine[0][1]-nextLine[1][1])<0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }

                      }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }   
                      }
                    } 
                  }else{
                    if(findUpOrDownByY(value,previousLine,"downwards")=="below"){
                      if((nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }

                      }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }

                      }
                    }else{
                      if((nextLine[0][1]-nextLine[1][1])<0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }

                      }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }   
                      }
                    }
                  }    
              }
              else if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) < 45)){
              if(value[1][0]-value[0][0]<0){
                if((previousLine[0][1]-previousLine[1][1])>=0){
                    if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                              particles.push(line);
                      }

                    }else{
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                              particles.push(line);
                      }
                    }

                }else{
                  if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                              particles.push(line);
                      }

                    }else{
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                              particles.push(line);
                      }  
                    }
                }
              }else{

                if((previousLine[0][1]-previousLine[1][1])>=0){
                    if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                              particles.push(line);
                      }

                    }else{
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                              particles.push(line);
                      }
                    }

                }else{
                  if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                              particles.push(line);
                      }

                    }else{
                       var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                    }
                }

              }
   
              }
              else if((Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45) && (Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45)){
                  if(value[1][0]-value[0][0]<0){
                      if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                        }else if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }

                        }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }

                        }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }

                        }
                      }else{
                        if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                        }else if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }

                        }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }

                        }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }

                        }
                      }
                }
          } //acute and obtuse angles
          else if(((Math.round(slopeOfPreviousLine*tanRatio)==-1) || (findAngleBetween(previousLine,value,slopeOfPreviousLine,tanRatio)>0)) &&
            ((findAngleBetween(value,nextLine,tanRatio,slopeOfNextLine)<0))){

            if((value[1][0]-value[0][0])<0){


              if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){

                if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                          if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                          }else if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }

                          }

                }else{
                  if(findUpOrDownByY(value,previousLine,"downwards")=="below"){
                    if((nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }

                        }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }

                        }
                  }else{
                    if((nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }

                        }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }   
                        }
                  }

                }

              }else{

                 if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                  if((previousLine[0][1]-previousLine[1][1])>=0){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                  }else{
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                  }
                }else{
                  if(findUpOrDownByY(value,previousLine,"downwards")=="below"){
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                              particles.push(line);
                      }

                  }else{
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                              particles.push(line);
                      }
                  }  

                }
              }
            }else{

              if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){

                if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                        if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                        }else if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }

                        }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])>=0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }

                        }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }

                        }

                }else{
                  if(findUpOrDownByY(value,previousLine,"downwards")=="below"){
                    if((nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }

                        }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }

                        }
                  }else{
                    if((nextLine[0][1]-nextLine[1][1])<0){
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }

                        }else{
                          var p=offset,counter=1;
                          // plot for left side
                          for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                  particles.push(line);
                          }
                          counter=1;
                          // plot for right side
                          for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                              var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                  particles.push(line);
                          }   
                      }
                  }

                }

              }else{

                 if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                  if((previousLine[0][1]-previousLine[1][1])>=0){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                  }else{
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                  }
                }else{
                  if(findUpOrDownByY(value,previousLine,"downwards")=="below"){
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                              particles.push(line);
                      }

                  }else{
                      var p=offset,counter=1;
                      // plot for left side
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                              particles.push(line);
                      }
                      counter=1;
                      // plot for right side
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                              particles.push(line);
                      }
                  }  

                }
              }

            }

          }//obtuse and acute angles
          else if((findAngleBetween(previousLine,value,slopeOfPreviousLine,tanRatio)<0) &&
            ((Math.round(slopeOfNextLine*tanRatio)==-1) || (findAngleBetween(value,nextLine,tanRatio,slopeOfNextLine)>0))){

              if((value[1][0]-value[0][0])<0){

                if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                    if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                      if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                          }else if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }

                          }

                    }else{
                      if((previousLine[0][1]-previousLine[1][1])>=0){
                          if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                          }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                          }
                      }else{
                        if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                        }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                        }
                      }
                    }

                }else{
                  if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                    if((nextLine[0][1]-nextLine[1][1])>=0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                    }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }

                    }
                  }else{
                    if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                    }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                    }
                      
                  }
                }
            }else{

              if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                    if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                      if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                          }else if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }

                          }
                    }else{
                      if((previousLine[0][1]-previousLine[1][1])>=0){
                          if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                          }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                          }
                      }else{
                        if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                        }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                        }
                      }
                    }

                }else{
                  if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                    if((nextLine[0][1]-nextLine[1][1])>=0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                    }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }

                    }
                  }else{
                    if(findUpOrDownByY(value,nextLine,"upwards")=="above"){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                    }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                    }
                      
                  }
                }
            }

          }//obtuse and obtuse angles
          else{

            if((value[1][0]-value[0][0])<0){
              if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                    if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                        if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                          }else if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                          }

                    }else{
                      if((previousLine[0][1]-previousLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                                    particles.push(line);
                            }

                      }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                                    particles.push(line);
                            }
                      }
                    }
              }else{

                if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                  if((nextLine[0][1]-nextLine[1][1])>=0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                  }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                  }
                }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]);
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]);
                                particles.push(line);
                        }
                }    
              }

            }else{

              if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                    if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                        if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                          }else if((previousLine[0][1]-previousLine[1][1])>=0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }

                          }else if((previousLine[0][1]-previousLine[1][1])<0 && (nextLine[0][1]-nextLine[1][1])<0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]+(counter*offset));
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]-(counter*offset));
                                    particles.push(line);
                            }

                          }

                    }else{
                      if((previousLine[0][1]-previousLine[1][1])>=0){
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                                    particles.push(line);
                            }

                      }else{
                            var p=offset,counter=1;
                            // plot for left side
                            for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                                    particles.push(line);
                            }
                            counter=1;
                            // plot for right side
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                                var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                                    particles.push(line);
                            }
                      }
                    }
              }else{

                if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                  if((nextLine[0][1]-nextLine[1][1])>=0){
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                  }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+(counter*offset));
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-(counter*offset));
                                particles.push(line);
                        }
                  }
                }else{
                        var p=offset,counter=1;
                        // plot for left side
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]);
                                particles.push(line);
                        }
                        counter=1;
                        // plot for right side
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var line = plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]);
                                particles.push(line);
                        }
                }    
              }
            }
          }

        }

        return particles;

    }

    //this creates random particles for a curve when the angle between the two consecutive curves in not acute or 90 degree
    function createParticlesForLinesWithObtuseAngle(index,value,xMin,xMax,yMin,yMax,tanRatio,nextLine,previousLine){
      var particles = [];

     
      if(index==-1){
      // this is when the slope of line is greater than 45 degrees
            if(Math.abs(Math.atan(tanRatio)*(180/Math.PI)) > 45)
            {
              //this randomly creates all the lines on the right
              for(var i = (value[0][0]+offset);i<=xMax;i+=offset){
                    particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]));
              }
               
              //this randomly creates all the lines on the right
              for(var i = (value[0][0]-offset);i>=xMin;i-=offset){
                    particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]));
              }

           }// this is when the slope of line is smaller or equal to 45 degrees
           else{
              //this randomly creates all the lines on the right
              for(var i = (value[0][1]-offset);i>=yMin;i-=offset){
                    particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]));
              }
               
              //this randomly creates all the lines on the right
              for(var i = (value[0][1]+offset);i<=yMax;i+=offset){
                    particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]));
              }
         }
      }else if(index==0){
            var slopeOfNextLine = (nextLine[0][1]-nextLine[1][1]) / (nextLine[1][0]-nextLine[0][0]);
        // this is when the slope of line is greater than 45 degrees
            if(Math.abs(Math.atan(tanRatio)*(180/Math.PI)) > 45)
            {
              if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){

                  //this randomly creates all the lines on the right
                  for(var i = (value[0][0]+offset);i<=xMax;i+=offset){
                        particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]));
                  }
                   
                  //this randomly creates all the lines on the right
                  for(var i = (value[0][0]-offset);i>=xMin;i-=offset){
                        particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]));
                  }
                }else{
                  var p=offset,
                      incrementor = offset;
                  if((nextLine[1][0]-nextLine[0][0])>=0){
                    if((value[0][1]-value[1][1])>=0){
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                              particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                        }
                        p=offset;

                        for(var i = (value[0][0]-offset);i>=xMin;i-=offset,p+=incrementor){
                        particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                        }
                    }else{
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                              particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                        }

                        p=offset;
                        for(var i = (value[0][0]-offset);i>=xMin;i-=offset,p+=incrementor){
                        particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                        }
                    }
                  }else{
                    if((value[0][1]-value[1][1])>=0){
                      for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                      }
                      p=offset;
                      for(var i = (value[0][0]-offset);i>=xMin;i-=offset,p+=incrementor){
                        particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                      }
                    }else{
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                        }
                        p=offset;
                        for(var i = (value[0][0]-offset);i>=xMin;i-=offset,p+=incrementor){
                        particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                        }
                    }
                  }
                }

           }// this is when the slope of line is smaller or equal to 45 degrees
           else{
              if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){

                if((nextLine[0][1]-nextLine[1][1])<0){
                      var p=offset,
                      incrementor = offset;
                      if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                        }
                      }else{
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                        }
                      }

                  }else{
                    var p=offset,
                      incrementor = offset;
                      if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                        }
                      }else{
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                        }
                      }
                  }

                  if((nextLine[0][1]-nextLine[1][1])<0){
                    var p=offset,
                    incrementor = offset;
                    if((value[1][0]-value[0][0])>=0){
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                      }
                    }else{
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                      }
                    }
                  }else{
                    var p=offset,
                    incrementor = offset;
                    if((value[1][0]-value[0][0])>=0){
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                      }
                    }else{
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                      }
                    }  
                  }

              }else{
                  //this randomly creates all the lines on the right
                  for(var i = (value[0][1]-offset);i>=yMin;i-=offset){
                        particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]));
                  }
                   
                  //this randomly creates all the lines on the right
                  for(var i = (value[0][1]+offset);i<=yMax;i+=offset){
                        particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]));
                  }
                }
         }
      }
      else if (index=data.length-2){

              var slopeOfPreviousLine = (previousLine[0][1]-previousLine[1][1])/(previousLine[1][0]-previousLine[0][0]);
              //when angle of previous line is greater than 45 degrees 
              if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                if(Math.abs(Math.atan(tanRatio)*(180/Math.PI)) > 45){
                  //this randomly creates all the lines on the right
                  for(var i = (value[0][0]+offset);i<=xMax;i+=offset){
                        particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]));
                  }
                   
                  //this randomly creates all the lines on the right
                  for(var i = (value[0][0]-offset);i>=xMin;i-=offset){
                        particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]));
                  }
                }else{

                  if(((value[1][0]-value[0][0])<0 && (previousLine[0][1]-previousLine[1][1])>=0) || ((value[1][0]-value[0][0])>=0 && (previousLine[0][1]-previousLine[1][1])<0)){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                  }else if(((value[1][0]-value[0][0])>=0 && (previousLine[0][1]-previousLine[1][1])>=0) || ((value[1][0]-value[0][0])<0 && (previousLine[0][1]-previousLine[1][1])<0)){
                    var p=offset,counter=1;
                    // plot for left side
                    for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }
                    counter=1;
                    // plot for right side
                    for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                        var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter *offset)), line = plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]);
                            particles.push(line);
                    }

                  }
                    
                }
              } //when angle of previous line is less than 45 degrees 
              else{
                if(Math.abs(Math.atan(tanRatio)*(180/Math.PI)) < 45){
                    //this randomly creates all the lines on the right
                    for(var i = (value[0][1]-offset);i>=yMin;i-=offset){
                          particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]));
                    }
                     
                    //this randomly creates all the lines on the right
                    for(var i = (value[0][1]+offset);i<=yMax;i+=offset){
                          particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]));
                    }
                  }else{

                    if(((previousLine[1][0]-previousLine[0][0])<0 && (value[0][1]-value[1][1])>=0)||((previousLine[1][0]-previousLine[0][0])>=0 && (value[0][1]-value[1][1])<0)){
                        var p=offset,counter=1;
                        //this randomly creates all the lines on the left
                        for(var i = (value[0][1]-offset);i>=xMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                            particles.push(line);
                        }
                         
                        counter=1;
                        //this randomly creates all the lines on the right
                        for(var i = (value[0][0]-offset);i>=xMax;i-=offset){
                               var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                            particles.push(line);
                        }

                    }else if(((previousLine[1][0]-previousLine[0][0])>=0 && (value[0][1]-value[1][1])>=0)||((previousLine[1][0]-previousLine[0][0])<0 && (value[0][1]-value[1][1])<0)) {
                        var p=offset,counter=1;
                        //this randomly creates all the lines on the right
                        for(var i = (value[0][0]+offset);i<=xMax;i+=offset){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                            particles.push(line);
                        }
                         
                        counter=1;
                        //this randomly creates all the lines on the left
                        for(var i = (value[0][0]-offset);i>=xMin;i-=offset){
                               var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter *offset)), line = plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]);
                            particles.push(line);
                        }
                    }   
                  }
              }        
      }
      
      return particles;
      
    }

    //this creates random particles for a curve when the angle between the two consecutive curves is acute or 90 degree
    function createParticlesForLinesWithAcuteAngleOrPerpendicular(index,value,xMin,xMax,yMin,yMax,tanRatio,nextLine,previousLine){
      var particles = [];


      //this plots random lines for first and last element in the flow
      if(index==0 || index==data.length-2){
          if(index==0){
            var slopeOfNextLine =  (nextLine[0][1]-nextLine[1][1]) / (nextLine[1][0]-nextLine[0][0]);
          }else{
            var slopeOfPreviousLine = (previousLine[0][1]-previousLine[1][1])/(previousLine[1][0]-previousLine[0][0]);
          }

      // this is when the slope of line is greater than 45 degrees
            if(Math.abs(Math.atan(tanRatio)*(180/Math.PI)) > 45)
            {  
              //this randomly creates all the lines on the right
              if(nextLine!=null && previousLine==undefined){
                if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) < 45){
                  var p=offset,
                      incrementor = offset;
                  if((nextLine[1][0]-nextLine[0][0])>=0){
                    if((value[0][1]-value[1][1])>=0){
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                              particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                        }
                    }else{
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                              particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                        }
                    }
                  }else{
                    if((value[0][1]-value[1][1])>=0){
                      for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                      }
                    }else{
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                        }
                    }
                  }
                }else{
                if(findLeftOrRightByX(value,nextLine,"upwards")=="right"){
                  var p=offset,
                      incrementor = offset;
                  if((value[0][1]-value[1][1])>=0){
                    for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                          particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                    }
                  }else{
                    for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                          particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                    }
                  }
                }
                else{
                 var p=offset,
                    incrementor = offset;
                    if((value[0][1]-value[1][1])>=0){
                      for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                      }
                    }else{
                        for(var i = (value[0][0]+p);i<=xMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                        }
                    }
                } 
              }
            }else if(nextLine==null && previousLine!=undefined){


                    if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) < 45){

                      if((previousLine[1][0]-previousLine[0][0])>=0){
                          if((value[0][1]-value[1][1])>=0){
                               var p=offset,counter=1;
                               for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter*offset));
                                    particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                              }else{
                                var p=offset,counter=1;
                                 for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter*offset));
                                    particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                  }
                              }
                          }else{
                            if((value[0][1]-value[1][1])>=0){
                              var p=offset,counter=1;
                               for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter*offset));
                                  particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                            }else{
                              var p=offset,counter=1;
                               for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter*offset));
                                  particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                            }
                          }

                    }else{

                        if(findLeftOrRightByX(value,previousLine,"downwards")=="left"){
                          if((value[0][1]-value[1][1])>=0){
                               var p=offset,counter=1;
                               for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter*offset));
                                    particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                              }else{
                                var p=offset,counter=1;
                                 for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter*offset));
                                    particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                  }
                              }
                          }else{
                            if((value[0][1]-value[1][1])>=0){
                              var p=offset,counter=1;
                               for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter*offset));
                                  particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                            }else{
                              var p=offset,counter=1;
                               for(var i = (value[0][0]+p);i<=xMax;i+=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter*offset));
                                  particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                            }
                          }
                    }
 
                }
            
              //this randomly creates all the lines on the left
              if(nextLine!=undefined && previousLine==undefined){
                  if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) < 45){
                    var p=offset,
                        incrementor = offset;
                    if((nextLine[1][0]-nextLine[0][0])>=0){
                      var p=offset,
                          incrementor = offset;
                      if((value[0][1]-value[1][1])>=0){
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                        }
                      }else{
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                        }
                      }   
                    }else{
                      var p=offset,
                          incrementor = offset;
                      if((value[0][1]-value[1][1])>=0){
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,p+=incrementor){
                                particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                          }
                      }else{
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,p+=incrementor){
                                particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                          }  
                      }
                    }
                }else{
                    if(findLeftOrRightByX(value,nextLine,"upwards")=="right"){
                      var p=offset,
                          incrementor = offset;
                      if((value[0][1]-value[1][1])>=0){
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                        }
                      }else{
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                        }
                      }
                    }else{
                      var p=offset,
                          incrementor = offset;
                      if((value[0][1]-value[1][1])>=0){
                          for(var i = (value[0][0]-p);i>=xMin;i-=offset,p+=incrementor){
                                particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]+p));
                          }
                      }else{
                        for(var i = (value[0][0]-p);i>=xMin;i-=offset,p+=incrementor){
                                particles.push(plotTheLinesForX(i,tanRatio,value[0][1],value[1][1]-p));
                          }  
                      }
                    }
                  }
              }else if(nextLine==null && previousLine!=undefined){

                    if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) < 45){

                      if((previousLine[1][0]-previousLine[0][0])>=0){
                          if((value[0][1]-value[1][1])>=0){
                               var p=offset,counter=1;
                               for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter*offset));
                                    particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                              }else{
                                var p=offset,counter=1;
                                 for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter*offset));
                                    particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                  }
                              }
                          }else{
                            if((value[0][1]-value[1][1])>=0){
                              var p=offset,counter=1;
                               for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter*offset));
                                  particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                            }else{
                              var p=offset,counter=1;
                               for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter*offset));
                                  particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                            }
                          }

                    }else{
                        if(findLeftOrRightByX(value,previousLine,"downwards")=="left"){
                          if((value[0][1]-value[1][1])>=0){
                               var p=offset,counter=1;
                               for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter*offset));
                                    particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                              }else{
                                var p=offset,counter=1;
                                 for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                    var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter*offset));
                                    particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                  }
                              }
                          }else{
                            if((value[0][1]-value[1][1])>=0){
                              var p=offset,counter=1;
                               for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter*offset));
                                  particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                            }else{
                              var p=offset,counter=1;
                               for(var i = (value[0][0]-p);i>=xMin;i-=offset,counter+=1){
                                  var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter*offset));
                                  particles.push(plotTheLinesForX(temp[1][0],tanRatio,temp[1][1],value[1][1]));
                                }
                            }
                          }
                    }

                }
           }// this is when the slope of the line is smaller or equal to 45 degrees
           else{
              //this randomly creates all the lines on the left
              if(nextLine!=undefined && previousLine==undefined){

                if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) > 45){
                  if((nextLine[0][1]-nextLine[1][1])<0){
                      var p=offset,
                      incrementor = offset;
                      if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                        }
                      }else{
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                        }
                      }

                  }else{
                    var p=offset,
                      incrementor = offset;
                      if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                        }
                      }else{
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                        }
                      }
                  }

                }else{

                  if(findUpOrDownByY(value,nextLine,"upwards")=="below"){
                    var p=offset,
                      incrementor = offset;
                      if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                        }
                      }else{
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                        }
                      }
                  }
                  else{
                    var p=offset,
                      incrementor = offset;
                      if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                        }
                      }else{
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,p+=incrementor){
                              particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                        }
                      }
                }
              }
            }else if(nextLine==null && previousLine!=undefined){

              if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                  if((previousLine[0][1]-previousLine[1][1])>=0){
                    var p=offset,counter=1;
                    if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter*offset));
                            particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                          }
                    }else{
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter*offset));
                            particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                          }
                    }
                  }else{
                    if((value[1][0]-value[0][0])>=0){
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]-(counter*offset));
                          particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                        }
                    }else{
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][1]-(counter*offset));
                          particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                        }
                    }

                  }

              }else{
                  if(findUpOrDownByY(value,previousLine,"downwards")=="below"){
                    var p=offset,counter=1;
                    if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter*offset));
                            particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                          }
                    }else{
                        for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter*offset));
                            particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                          }
                    }
                  }else{
                    var p=offset,counter=1;
                    if((value[1][0]-value[0][0])>=0){
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter*offset));
                          particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                        }
                    }else{
                      for(var i = (value[0][1]-p);i>=yMin;i-=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter*offset));
                          particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                        }
                    }

                  }
              }

            }
 
              //this randomly creates all the lines on the right
              if(nextLine!=undefined && previousLine==undefined){
                if(Math.abs(Math.atan(slopeOfNextLine)*(180/Math.PI)) < 45){
                  if((nextLine[0][1]-nextLine[1][1])<0){
                    var p=offset,
                    incrementor = offset;
                    if((value[1][0]-value[0][0])>=0){
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                      }
                    }else{
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                      }
                    }
                  }else{
                    var p=offset,
                    incrementor = offset;
                    if((value[1][0]-value[0][0])>=0){
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                      }
                    }else{
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                            particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                      }
                    }  
                  }
                }else{
                    if(findUpOrDownByY(value,nextLine,"upwards")=="below"){
                      var p=offset,
                          incrementor = offset;
                          if((value[1][0]-value[0][0])>=0){
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                                  particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                            }
                          }else{
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                                  particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                            }
                          }
                    }
                    else{
                          var p=offset,
                          incrementor = offset;
                          if((value[1][0]-value[0][0])>=0){
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                                  particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]+p));
                            }
                          }else{
                            for(var i = (value[0][1]+p);i<=yMax;i+=offset,p+=incrementor){
                                  particles.push(plotTheLinesForY(i,tanRatio,value[0][0],value[1][0]-p));
                            }
                          }   
                    }
                  }
              }else if(nextLine==null && previousLine!=undefined){

                if(Math.abs(Math.atan(slopeOfPreviousLine)*(180/Math.PI)) > 45){
                  if((previousLine[0][1]-previousLine[1][1])>=0){
                    var p=offset,counter=1;
                    if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter*offset));
                            particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                          }
                    }else{
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter*offset));
                            particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                          }
                    }
                  }else{
                    if((value[1][0]-value[0][0])>=0){
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]-(counter*offset),slopeOfPreviousLine,previousLine[0][1],previousLine[1][1]+(counter*offset));
                          particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                        }
                    }else{
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForX(previousLine[0][0]+(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][1]+(counter*offset));
                          particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                        }
                    }

                  }

              }else{
                  if(findUpOrDownByY(value,previousLine,"downwards")=="below"){
                    var p=offset,counter=1;
                    if((value[1][0]-value[0][0])>=0){
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter*offset));
                            particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                          }
                    }else{
                        for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                            var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]-(counter*offset));
                            particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                          }
                    }
                  }else{
                    var p=offset,counter=1;
                    if((value[1][0]-value[0][0])>=0){
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter*offset));
                          particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                        }
                    }else{
                      for(var i = (value[0][1]+p);i<=yMax;i+=offset,counter+=1){
                          var temp = plotTheLinesForY(previousLine[0][1]-(counter*offset),slopeOfPreviousLine,previousLine[0][0],previousLine[1][0]+(counter*offset));
                          particles.push(plotTheLinesForY(temp[1][1],tanRatio,temp[1][0],value[1][0]));
                        }
                    }

                  }
              }
             
             }
          }
      } 
      return particles;

    }