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

# Setup the screen
wn = turtle.Screen()
wn.title("Snake")
wn.bgcolor("blue")
wn.setup(width=600, height=600)
wn.tracer(0) # Turns off screen updates

# Snake
head = create_turtle("square", "black")
head.goto(0,0)
head.direction = "stop"

# Food
food = create_turtle("circle", "red")
move_rand(food, wn)

# Keyboard bindings
def go_up():
  head.direction = "up"

def go_down():
  head.direction = "down"

def go_right():
  head.direction = "right"

def go_left():
  head.direction = "left"

wn.listen()
wn.onkeypress(go_up, "Up")
wn.onkeypress(go_down, "Down")
wn.onkeypress(go_right, "Right")
wn.onkeypress(go_left, "Left")

# Main Game Loop
while True:
  wn.update()

  if head.distance(food) < 20:
    move_rand(food, wn)

  move(head)
  time.sleep(delay)

wn.mainloop()