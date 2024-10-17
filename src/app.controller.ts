import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Reservation } from './Reservation.dto';
import { query, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private data : Array<Reservation> = [

  ];
  private error = null;


  @Get()
  @Render('index')
  getHello() 
  {
    return {
      data: {},
      error: undefined
    }
  }

  @Post("/reserve")
  postReservation(@Body() body: Reservation, @Res() res: Response)
  {
    if (body != undefined)
    {
      if (body.firstName.length > 0 && body.lastName.length > 0)
      {
        if (body.emailAddress.length > 0)
        {
          if ("[A-Za-z0-9]+@[a-z]+.[a-z]".match(body.emailAddress))
          {
            if (body.dateTime.length > 0)
            {
              if (Date.parse(body.dateTime) > Date.now())
              {
                if (body.viewers > 0 && body.viewers <= 10)
                {
                  this.data.push(new Reservation(body.firstName, body.lastName, body.emailAddress, body.dateTime, body.viewers));
                  res.redirect(303, "/success");
                }
                else
                {
                  res.render("index", {
                    data: body,
                    error: "A nézők számának nagyobbnak kell lennie mint nulla és kisebbnek mint 11."
                  })
                }
              }
              else
              {
                res.render("index", {
                  data: body,
                  error: "Az időpont nem lehet korábbi mint a mostani."
                })
              }
            }
            else
            {
              res.render("index", {
                data: body,
                error: "Nincs megadva időpont."
              })
            }
          }
          else
          {
            res.render("index", {
              data: body,
              error: "Rossz az email cím formája."
            })
          }
        }
        else
        {
          res.render("index", {
            data: body,
            error: "Nem lett megadva az email cím."
          })
        } 
      }
      else
      {
        res.render("index", {
          data: body,
          error: "Nem lett megadva a vezeték- vagy a keresztnév."
        })
      }
    }
    else
    {
      res.render("index", {
        error: "Ezt hogy csináltad?"
      })
    }
    
    console.log(body);
  }

  @Get("success")
  @Render("success")
  getSuccess()
  {

  }
}
