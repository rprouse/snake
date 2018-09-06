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
def move_rand(t):
  x = random.randint(-290,290)
  y = random.randint(-290,290)
  t.goto(x,y)

# Setup the screen
wn = turtle.Screen()
wn.title("Snake")
wn.bgcolor("blue")
wn.setup(width=600, height=600)
wn.tracer(0) # Turns off screen updates

# Snake
head = turtle.Turtle()
head.speed(0)
head.shape("square")
head.color("black")
head.penup()
head.goto(0,0)
head.direction = "stop"

# Food
food = turtle.Turtle()
food.speed(0)
food.shape("circle")
food.color("red")
food.penup()
move_rand(food)

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
    move_rand(food)

  move(head)
  time.sleep(delay)

wn.mainloop()