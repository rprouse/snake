import random
import turtle
import time

delay = 0.1

# Functions
def move(t):
  if t.direction == "up":
    y = t.ycor()
    t.sety(y + 20)
  if t.direction == "down":
    y = t.ycor()
    t.sety(y - 20)
  if t.direction == "left":
    x = t.xcor()
    t.setx(x - 20)
  if t.direction == "right":
    x = t.xcor()
    t.setx(x + 20)

# Move to random spot on the screen
def move_rand(t, s):
  w = int(s.window_width() / 2) - 20
  h = int(s.window_height() / 2) - 20
  x = random.randint(-w, w)
  y = random.randint(-h, h)
  t.goto(x,y)

def create_turtle(shape, color):
  t = turtle.Turtle()
  t.speed(0)
  t.shape(shape)
  t.color(color)
  t.penup()
  return t

def die(head, body):
  time.sleep(1)
  head.goto(0,0)
  head.direction = "stop"
  for b in body:
    b.hideturtle()
  body.clear()


# Setup the screen
wn = turtle.Screen()
wn.title("Snake")
wn.bgcolor("blue")
wn.setup(width=600, height=600)
wn.tracer(0) # Turns off screen updates

# Snake head
head = create_turtle("square", "black")
head.goto(0,0)
head.direction = "stop"

# Snake body
body = []

# Food
food = create_turtle("circle", "red")
move_rand(food, wn)

# Keyboard bindings
def go_up():
  if(head.direction != "down"):
    head.direction = "up"

def go_down():
  if(head.direction != "up"):
    head.direction = "down"

def go_right():
  if(head.direction != "left"):
    head.direction = "right"

def go_left():
  if(head.direction != "right"):
    head.direction = "left"

wn.listen()
wn.onkeypress(go_up, "Up")
wn.onkeypress(go_down, "Down")
wn.onkeypress(go_right, "Right")
wn.onkeypress(go_left, "Left")

# Main Game Loop
while True:
  wn.update()

  #Check for collision
  w = int(wn.window_width() / 2) - 20
  h = int(wn.window_height() / 2) - 20

  # Border collisons
  if head.xcor() > w or head.xcor() < -w or head.ycor() > h or head.ycor() < -h:
    die(head, body)

  # Body collisons
  for b in body:
    if(head.distance(b) < 20):
      die(head, body)


  # Touching food?
  if head.distance(food) < 20:
    move_rand(food, wn)

    # Add body segment
    body.append(create_turtle("square", "green"))

  # Move body
  for i in range(len(body)-1, -1, -1):
    if(i == 0):
      body[i].goto(head.xcor(), head.ycor())
    else:
      body[i].goto(body[i-1].xcor(), body[i-1].ycor())

  move(head)
  time.sleep(delay)

wn.mainloop()