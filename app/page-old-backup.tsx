"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Sparkles, Globe, BookOpen, Info, Search, Filter, Menu, X, Share } from "lucide-react"

// Enhanced spice particle component with performance optimization
const SpiceParticle = ({ particle, isVisible }: { particle: any; isVisible: boolean }) => (
  <div
    className="absolute rounded-full animate-float pointer-events-none"
    style={{
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      backgroundColor: particle.color,
      animationDelay: `${particle.delay}s`,
      animationDuration: `${particle.speed + 4}s`,
      filter: 'blur(0.5px)',
      opacity: isVisible ? particle.opacity : 0,
      transition: 'opacity 0.5s ease'
    }}
  />
)

// Lazy loading image component
const LazyImage = ({ src, alt, className, ...props }: any) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.disconnect()
    }

    return () => observer.disconnect()
  }, [])

    return (
    <img
      ref={imgRef}
      src={isInView ? src : "/placeholder.svg"}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      {...props}
    />
  )
}

export default function SpiceBazaarHome() {
  const [animateSpices, setAnimateSpices] = useState(false)
  const [hoveredSpice, setHoveredSpice] = useState<number | null>(null)
  const [flippedRecipes, setFlippedRecipes] = useState<Set<number>>(new Set())
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(false)
  const [isSpiceSectionVisible, setIsSpiceSectionVisible] = useState(false)
  const [isRecipeSectionVisible, setIsRecipeSectionVisible] = useState(false)
  const [isCollectionsSectionVisible, setIsCollectionsSectionVisible] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const spiceSectionRef = useRef<HTMLElement>(null)
  const recipeSectionRef = useRef<HTMLElement>(null)
  const collectionsSectionRef = useRef<HTMLElement>(null)

  // Enhanced particle system with mobile optimization and performance throttling
  const spiceParticles = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const particleCount = isMobile ? 6 : 12 // Reduced for better performance
    
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: isMobile ? Math.random() * 3 + 2 : Math.random() * 5 + 3,
      speed: Math.random() * 1.5 + 0.8, // Slightly slower for better performance
      color: ['#c65d32', '#fbbf24', '#ef4444'][Math.floor(Math.random() * 3)],
      delay: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.3
    }))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setAnimateSpices(true), 500)
    const loadingTimer = setTimeout(() => setIsLoading(false), 1000)
    const initTimer = setTimeout(() => setHasInitialized(true), 1500)
    
    // Mouse movement tracking for particle interaction with throttling
    let mouseMoveTimeout: NodeJS.Timeout
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseMoveTimeout) return
      
      mouseMoveTimeout = setTimeout(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        mouseMoveTimeout = null as any
      }, 16) // ~60fps throttling
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(loadingTimer)
      clearTimeout(initTimer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Intersection observers for section animations
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all sections immediately
      setIsHeroVisible(true)
      setIsSpiceSectionVisible(true)
      setIsRecipeSectionVisible(true)
      setIsCollectionsSectionVisible(true)
      return
    }

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const spiceObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSpiceSectionVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const recipeObserver = new IntersectionObserver(
      ([entry]) => {
        setIsRecipeSectionVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const collectionsObserver = new IntersectionObserver(
      ([entry]) => {
        setIsCollectionsSectionVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    try {
      if (heroRef.current) {
        heroObserver.observe(heroRef.current)
      }
      if (spiceSectionRef.current) {
        spiceObserver.observe(spiceSectionRef.current)
      }
      if (recipeSectionRef.current) {
        recipeObserver.observe(recipeSectionRef.current)
      }
      if (collectionsSectionRef.current) {
        collectionsObserver.observe(collectionsSectionRef.current)
      }
    } catch (error) {
      console.warn('Intersection observer setup failed:', error)
    }

    return () => {
      heroObserver.disconnect()
      spiceObserver.disconnect()
      recipeObserver.disconnect()
      collectionsObserver.disconnect()
    }
  }, [])

  const toggleRecipeFlip = (index: number) => {
    setFlippedRecipes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const featuredSpices = [
    {
      name: "Saffron Threads",
      origin: "Kashmir, India",
      price: "$24.99",
      rating: 4.9,
      image: "/saffron-threads-in-glass-jar.png",
      description: "The world's most precious spice",
      flavor: "Floral, honey-like",
      details:
        "Hand-picked from Crocus flowers at dawn. Each thread contains intense flavor and beautiful golden color. Used in Persian rice, Spanish paella, and Indian sweets.",
      uses: ["Biryani", "Paella", "Bouillabaisse", "Kulfi"],
    },
    {
      name: "Ras el Hanout",
      origin: "Morocco",
      price: "$18.99",
      rating: 4.8,
      image: "/moroccan-spice-blend-ras-el-hanout.png",
      description: "Traditional Moroccan spice blend",
      flavor: "Complex, warm, aromatic",
      details:
        "A masterful blend of 12+ spices including rose petals, cinnamon, and cardamom. Each family has their secret recipe passed down through generations.",
      uses: ["Tagines", "Couscous", "Grilled meats", "Vegetable stews"],
    },
    {
      name: "Cardamom Pods",
      origin: "Kerala, India",
      price: "$16.99",
      rating: 4.7,
      image: "/green-cardamom-pods.png",
      description: "Queen of spices from India",
      flavor: "Sweet, floral, citrusy",
      details:
        "Green cardamom pods from the Western Ghats. Best used whole or freshly ground. Essential in chai, desserts, and savory dishes.",
      uses: ["Chai tea", "Biryani", "Desserts", "Coffee"],
    },
    {
      name: "Harissa Paste",
      origin: "Tunisia",
      price: "$12.99",
      rating: 4.6,
      image: "/harissa-paste-in-jar.png",
      description: "Fiery North African chili paste",
      flavor: "Hot, smoky, garlicky",
      details:
        "Made from dried chilies, garlic, and aromatic spices. A staple condiment that adds depth and heat to any dish. Traditionally made in stone mortars.",
      uses: ["Couscous", "Grilled meats", "Stews", "Marinades"],
    },
  ]

  const recipes = [
    {
      title: "Moroccan Tagine",
      time: "2 hours",
      difficulty: "Medium",
      image: "/moroccan-tagine-with-vegetables-and-spices.png",
      spices: ["Ras el Hanout", "Cinnamon", "Ginger"],
      ingredients: [
        "2 lbs lamb shoulder, cubed",
        "2 tbsp Ras el Hanout",
        "1 cinnamon stick",
        "2 onions, sliced",
        "1 cup dried apricots",
        "2 cups chicken broth",
        "Fresh cilantro",
      ],
      description: "A slow-cooked North African stew bursting with aromatic spices and tender meat.",
    },
    {
      title: "Indian Biryani",
      time: "1.5 hours",
      difficulty: "Hard",
      image: "/indian-biryani-with-saffron-and-spices.png",
      spices: ["Saffron", "Cardamom", "Bay Leaves"],
      ingredients: [
        "2 cups basmati rice",
        "1 lb chicken, marinated",
        "Pinch of saffron",
        "6 green cardamom pods",
        "3 bay leaves",
        "Fried onions",
        "Mint & cilantro",
      ],
      description: "Fragrant layered rice dish with perfectly spiced meat and aromatic saffron.",
    },
    {
      title: "Tunisian Couscous",
      time: "45 mins",
      difficulty: "Easy",
      image: "/tunisian-couscous-with-harissa.png",
      spices: ["Harissa", "Cumin", "Coriander"],
      ingredients: [
        "2 cups couscous",
        "3 tbsp harissa paste",
        "Mixed vegetables",
        "1 tsp ground cumin",
        "1 tsp coriander seeds",
        "Olive oil",
        "Fresh herbs",
      ],
      description: "Light and fluffy semolina with spicy harissa and seasonal vegetables.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-primary">Spice Bazaar</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#spices"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Spices
            </a>
            <a
              href="#recipes"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Recipes
            </a>
            <a
              href="#stories"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            >
              Stories
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105">
              About
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:scale-110 transition-transform duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-full bg-card border-l border-border shadow-2xl transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-primary">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-4">
                <a
                  href="#spices"
                  className="block py-3 px-4 text-foreground hover:text-primary transition-all duration-300 hover:bg-muted rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Spices
                </a>
                <a
                  href="#recipes"
                  className="block py-3 px-4 text-foreground hover:text-primary transition-all duration-300 hover:bg-muted rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Recipes
                </a>
                <a
                  href="#stories"
                  className="block py-3 px-4 text-foreground hover:text-primary transition-all duration-300 hover:bg-muted rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Stories
                </a>
                <a
                  href="#about"
                  className="block py-3 px-4 text-foreground hover:text-primary transition-all duration-300 hover:bg-muted rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="absolute inset-0 bg-[url('/moroccan-spice-market-bazaar-colorful-spices.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-pulse"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div
            className={`transition-all duration-1000 ${animateSpices ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-6 text-balance">
              Journey Through
              <span className="text-primary block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent gradient-text-enhanced">
                Exotic Flavors
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Discover authentic spices from the vibrant bazaars of Morocco and India. Each spice tells a story, each
              flavor awakens your senses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 hover:shadow-lg btn-enhanced"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shop Spices
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent hover:scale-105 transition-all duration-300 hover:shadow-lg btn-enhanced"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Recipes
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Spice Animation */}
        {isHeroVisible && spiceParticles.map((particle) => (
          <SpiceParticle key={particle.id} particle={particle} isVisible={isHeroVisible} />
        ))}
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-card/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Premium Spices" },
              { number: "25+", label: "Countries" },
              { number: "10K+", label: "Happy Customers" },
              { number: "500+", label: "Authentic Recipes" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spices */}
      <section ref={spiceSectionRef} id="spices" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isSpiceSectionVisible && hasInitialized ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              Premium Spice Collection
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
              Hand-selected from the finest spice markets across Morocco and India
            </p>
            
            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search spices..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm" className="shrink-0">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 card-grid-enhanced transition-all duration-1000 ${isSpiceSectionVisible && hasInitialized ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {isLoading ? (
              // Loading skeleton cards
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={`skeleton-${index}`} className="border-border/50 relative overflow-hidden">
                  <div className="animate-pulse">
                    <div className="w-full h-48 bg-muted rounded-t-lg"></div>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-6 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-8 bg-muted rounded"></div>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              featuredSpices.map((spice, index) => (
                <Card
                  key={index}
                  className={`group hover:shadow-2xl transition-all duration-600 hover:-translate-y-3 border-border/50 relative overflow-hidden spice-card-enhanced bg-gradient-to-br from-background to-card animate-delay-${index * 100}`}
                  onMouseEnter={() => setHoveredSpice(index)}
                  onMouseLeave={() => setHoveredSpice(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: isSpiceSectionVisible ? 1 : 0,
                    transform: isSpiceSectionVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease ${index * 100}ms`
                  }}
                >
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                      <Globe className="w-3 h-3 mr-1" />
                      {spice.origin.split(",")[1]}
                    </Badge>
                      <div className="flex items-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        <Star className="w-4 h-4 fill-secondary text-secondary mr-1" />
                        <span className="text-sm font-medium text-foreground">{spice.rating}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl font-[family-name:var(--font-playfair)] mb-2 group-hover:text-primary transition-colors duration-300">
                      {spice.name}
                    </CardTitle>
                    
                    <CardDescription className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {spice.description}
                    </CardDescription>
                    
                    <div className="mb-3">
                      <span className="text-sm font-medium text-accent font-[family-name:var(--font-dancing)] group-hover:text-accent/80 transition-colors duration-300">
                        ✨ {spice.flavor}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 pt-0">
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-medium">
                        Perfect for:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {spice.uses.map((use, useIndex) => (
                          <Badge 
                            key={useIndex} 
                            variant="secondary" 
                            className="text-xs hover:scale-110 hover:bg-secondary/80 transition-all duration-200 cursor-pointer group-hover:bg-secondary/60"
                          >
                            {use}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-muted/30 rounded-lg border border-border/50 group-hover:bg-muted/50 transition-colors duration-300">
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">
                        Origin Story:
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {spice.details}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                        {spice.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          Wishlist
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full group-hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                  
                  {/* Hover overlay with additional details */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/95 via-secondary/95 to-accent/95 backdrop-blur-sm transition-all duration-500 flex items-center justify-center p-6 ${
                        hoveredSpice === index ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                    <div className="text-white text-center space-y-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold font-[family-name:var(--font-playfair)] mb-2">
                        {spice.name}
                      </h4>
                      <p className="text-sm leading-relaxed opacity-90 mb-4">
                        {spice.details}
                      </p>
                        <div className="space-y-2">
                        <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                          Culinary Applications:
                        </p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {spice.uses.map((use, useIndex) => (
                              <Badge 
                                key={useIndex} 
                                variant="secondary" 
                              className="text-xs bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-200"
                              >
                                {use}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      <div className="pt-3 border-t border-white/20">
                        <p className="text-xs text-white/70">
                          Origin: <span className="text-white font-semibold">{spice.origin}</span>
                        </p>
                        <p className="text-xs text-white/70">
                          Flavor Profile: <span className="text-white font-semibold">{spice.flavor}</span>
                          </p>
                        </div>
                      </div>
                    </div>
              </Card>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Spice Categories */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              Explore Spice Categories
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              From warming spices to exotic blends, discover the perfect flavor for every dish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Warming Spices",
                description: "Cinnamon, nutmeg, and cloves for cozy comfort",
                icon: "🔥",
                count: "12 varieties",
                color: "from-orange-500 to-red-500"
              },
              {
                name: "Aromatic Herbs",
                description: "Fresh and dried herbs for bright flavors",
                icon: "🌿",
                count: "18 varieties",
                color: "from-green-500 to-emerald-500"
              },
              {
                name: "Exotic Blends",
                description: "Traditional spice mixtures from around the world",
                icon: "🌍",
                count: "8 blends",
                color: "from-purple-500 to-indigo-500"
              },
              {
                name: "Hot & Spicy",
                description: "Chilies and peppers for bold heat",
                icon: "🌶️",
                count: "15 varieties",
                color: "from-red-600 to-orange-600"
              },
              {
                name: "Sweet Spices",
                description: "Vanilla, cardamom, and saffron for desserts",
                icon: "🍯",
                count: "10 varieties",
                color: "from-yellow-400 to-amber-500"
              },
              {
                name: "Umami Boosters",
                description: "Mushroom powders and fermented spices",
                icon: "🍄",
                count: "6 varieties",
                color: "from-brown-600 to-gray-700"
              }
            ].map((category, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/50 relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  opacity: isSpiceSectionVisible ? 1 : 0,
                  transform: isSpiceSectionVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${index * 100}ms`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <CardContent className="p-8 relative z-10">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h4 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-3">
                    {category.name}
                  </h4>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{category.count}</span>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section ref={collectionsSectionRef} className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isCollectionsSectionVisible && hasInitialized ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              Curated Collections
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Hand-picked spice combinations for every culinary journey
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ${isCollectionsSectionVisible && hasInitialized ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              {
                title: "Moroccan Magic",
                description: "Complete your tagine with our signature Moroccan blend",
                spices: ["Ras el Hanout", "Cinnamon", "Ginger", "Turmeric"],
                price: "$34.99",
                icon: "🏺",
                color: "from-orange-500 to-red-500",
                benefits: ["Authentic flavor", "Perfect balance", "Traditional blend"]
              },
              {
                title: "Indian Feast",
                description: "Essential spices for authentic Indian cuisine",
                spices: ["Cardamom", "Cumin", "Coriander", "Saffron"],
                price: "$42.99",
                icon: "🕉️",
                color: "from-yellow-500 to-orange-500",
                benefits: ["Rich aromas", "Complex flavors", "Heritage blend"]
              }
            ].map((collection, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-600 hover:-translate-y-3 border-border/50 relative overflow-hidden bg-gradient-to-br from-background to-card"
                style={{
                  animationDelay: `${index * 200}ms`,
                  opacity: isCollectionsSectionVisible ? 1 : 0,
                  transform: isCollectionsSectionVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${index * 200}ms`
                }}
              >
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-16 h-16 bg-gradient-to-br ${collection.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-3xl">{collection.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground group-hover:text-primary transition-colors duration-300">
                      {collection.title}
                    </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {collection.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-foreground mb-2 text-sm uppercase tracking-wide">
                      Included Spices:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {collection.spices.map((spice, spiceIndex) => (
                        <Badge 
                          key={spiceIndex} 
                          variant="secondary" 
                          className="text-xs hover:scale-110 hover:bg-secondary/80 transition-all duration-200 cursor-pointer group-hover:bg-secondary/60"
                        >
                          ✨ {spice}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6 pt-0">
                  <div className="mb-4 p-3 bg-muted/30 rounded-lg border border-border/50 group-hover:bg-muted/50 transition-colors duration-300">
                    <h5 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                      Collection Benefits:
                    </h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {collection.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center group/item hover:translate-x-1 transition-transform duration-200">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-200"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                    <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                      {collection.price}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Wishlist
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90 group-hover:scale-105 transition-all duration-300"
                      >
                        View Collection
                      </Button>
                    </div>
                  </div>
                </CardContent>
                
                {/* Interactive hover overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-primary/95 via-secondary/95 to-accent/95 backdrop-blur-sm transition-all duration-500 flex items-center justify-center p-6 ${
                    hoveredSpice === index ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="text-white text-center space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{collection.icon}</span>
                    </div>
                    <h4 className="text-xl font-bold font-[family-name:var(--font-playfair)] mb-2">
                      {collection.title}
                    </h4>
                    <p className="text-sm leading-relaxed opacity-90 mb-4">
                      {collection.description}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                        Perfect for: <span className="text-white font-semibold">Authentic cooking</span>
                      </p>
                      <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                        Value: <span className="text-white font-semibold">Save 15% vs individual</span>
                      </p>
                    </div>
                    <div className="pt-3 border-t border-white/20">
                      <p className="text-xs text-white/70">
                        Includes: <span className="text-white font-semibold">{collection.spices.length} premium spices</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Collection Categories */}
          <div className="mt-16">
            <h4 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-8 text-center">
              Explore More Collections
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Starter Kits", icon: "🎁", count: "8 kits", color: "from-blue-500 to-indigo-500" },
                { name: "Chef's Choice", icon: "👨‍🍳", count: "12 collections", color: "from-purple-500 to-pink-500" },
                { name: "Seasonal", icon: "🍂", count: "6 collections", color: "from-green-500 to-emerald-500" },
                { name: "Limited Edition", icon: "⭐", count: "4 collections", color: "from-yellow-500 to-orange-500" }
              ].map((category, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: isCollectionsSectionVisible ? 1 : 0,
                    transform: isCollectionsSectionVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease ${index * 100}ms`
                  }}
                >
                  <div className={`bg-gradient-to-br ${category.color} p-4 rounded-lg text-center hover:scale-105 transition-all duration-300`}>
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h5 className="font-semibold text-white mb-1">{category.name}</h5>
                    <p className="text-white/80 text-sm">{category.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Inspirations */}
      <section ref={recipeSectionRef} id="recipes" className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className={`text-center mb-16 transition-all duration-1000 ${isRecipeSectionVisible && hasInitialized ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              Culinary Inspirations
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Traditional recipes that celebrate the art of spice blending
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${isRecipeSectionVisible && hasInitialized ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {recipes.map((recipe, index) => (
              <div key={index} className="group">
                <Card 
                  className="h-full hover:shadow-2xl transition-all duration-600 hover:-translate-y-3 border-border/50 relative overflow-hidden bg-gradient-to-br from-background to-card"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    opacity: isRecipeSectionVisible ? 1 : 0,
                    transform: isRecipeSectionVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease ${index * 150}ms`
                  }}
                >
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-2xl">
                            {recipe.title.includes('Tagine') ? '🥘' : recipe.title.includes('Biryani') ? '🍚' : '🍽️'}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-foreground group-hover:text-primary transition-colors duration-300">
                          {recipe.title}
                        </h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <span className="mr-1">⏱️</span>
                              {recipe.time}
                            </span>
                            <span className="flex items-center">
                              <span className="mr-1">📊</span>
                              {recipe.difficulty}
                            </span>
                        </div>
                      </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">
                      {recipe.description}
                    </p>
                    
                      <div className="mb-4">
                      <h5 className="font-medium text-foreground mb-2 text-sm uppercase tracking-wide">
                        Key Spices:
                      </h5>
                        <div className="flex flex-wrap gap-2">
                          {recipe.spices.map((spice, spiceIndex) => (
                          <Badge 
                            key={spiceIndex} 
                            variant="secondary" 
                            className="text-xs hover:scale-110 hover:bg-secondary/80 transition-all duration-200 cursor-pointer group-hover:bg-secondary/60"
                          >
                            ✨ {spice}
                            </Badge>
                          ))}
                        </div>
                      </div>
                  </CardHeader>
                  
                  <CardContent className="p-6 pt-0">
                    <div className="mb-4 p-3 bg-muted/30 rounded-lg border border-border/50 group-hover:bg-muted/50 transition-colors duration-300">
                      <h5 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                        Essential Ingredients:
                      </h5>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {recipe.ingredients.slice(0, 4).map((ingredient, ingredientIndex) => (
                          <li key={ingredientIndex} className="flex items-center group/item hover:translate-x-1 transition-transform duration-200">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-200"></span>
                            {ingredient}
                          </li>
                        ))}
                        {recipe.ingredients.length > 4 && (
                          <li className="text-xs text-primary font-medium cursor-pointer hover:underline">
                            +{recipe.ingredients.length - 4} more ingredients
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm" 
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                        onClick={() => toggleRecipeFlip(index)}
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Recipe
                      </Button>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="group-hover:bg-secondary/20 group-hover:text-secondary transition-all duration-300 hover:scale-105"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="group-hover:bg-accent/20 group-hover:text-accent transition-all duration-300 hover:scale-105"
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    </CardContent>
                  
                  {/* Interactive hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-primary/95 via-secondary/95 to-accent/95 backdrop-blur-sm transition-all duration-500 flex items-center justify-center p-6 ${
                      hoveredSpice === index ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="text-white text-center space-y-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold font-[family-name:var(--font-playfair)] mb-2">
                        {recipe.title}
                      </h4>
                      <p className="text-sm leading-relaxed opacity-90 mb-4">
                        {recipe.description}
                      </p>
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                          Cooking Time: {recipe.time}
                        </p>
                        <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                          Difficulty: {recipe.difficulty}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-white/20">
                        <p className="text-xs text-white/70">
                          Perfect for: <span className="text-white font-semibold">Family dinners, Special occasions</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  </Card>
              </div>
            ))}
          </div>
          
          {/* Interactive Recipe Categories */}
          <div className="mt-16">
            <h4 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-8 text-center">
              Explore Recipe Categories
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Quick & Easy", icon: "⚡", count: "25 recipes", color: "from-green-500 to-emerald-500" },
                { name: "Traditional", icon: "🏺", count: "40 recipes", color: "from-orange-500 to-red-500" },
                { name: "Vegetarian", icon: "🥬", count: "30 recipes", color: "from-green-600 to-teal-600" },
                { name: "Spice-Forward", icon: "🌶️", count: "35 recipes", color: "from-red-600 to-pink-600" }
              ].map((category, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    opacity: isRecipeSectionVisible ? 1 : 0,
                    transform: isRecipeSectionVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease ${index * 100}ms`
                  }}
                >
                  <div className={`bg-gradient-to-br ${category.color} p-4 rounded-lg text-center hover:scale-105 transition-all duration-300`}>
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h5 className="font-semibold text-white mb-1">{category.name}</h5>
                    <p className="text-white/80 text-sm">{category.count}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Stories */}
      <section
        id="stories"
        className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/traditional-spice-merchant-in-moroccan-bazaar-with.png')] bg-fixed bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              Stories Behind the Spices
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Every spice carries centuries of tradition, culture, and heritage
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="group">
              <img
                src="/traditional-spice-merchant-in-moroccan-bazaar-with.png"
                alt="Traditional spice merchant"
                className="rounded-lg shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-6">
              <h4 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-foreground">
                The Ancient Spice Routes
              </h4>
              <p className="text-lg text-muted-foreground text-pretty">
                For thousands of years, spices have been more than just flavor enhancers. They were currency, medicine,
                and symbols of wealth and power. Our spices follow the same ancient routes that connected civilizations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                  <div>
                    <h5 className="font-semibold text-foreground font-[family-name:var(--font-dancing)] text-lg">
                      Moroccan Tradition
                    </h5>
                    <p className="text-muted-foreground">
                      Hand-blended spices passed down through generations of master spice merchants
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300 delay-100">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                  <div>
                    <h5 className="font-semibold text-foreground font-[family-name:var(--font-dancing)] text-lg">
                      Indian Heritage
                    </h5>
                    <p className="text-muted-foreground">
                      Sourced directly from family farms in Kerala, Kashmir, and Tamil Nadu
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300 delay-200">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                  <div>
                    <h5 className="font-semibold text-foreground font-[family-name:var(--font-dancing)] text-lg">
                      Sustainable Sourcing
                    </h5>
                    <p className="text-muted-foreground">
                      Supporting local communities and traditional farming methods
                    </p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="mt-6 hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Learn Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              What Our Customers Say
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover why chefs and home cooks choose our authentic spices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Chef Maria Rodriguez",
                role: "Executive Chef, La Cocina",
                image: "/placeholder-user.jpg",
                rating: 5,
                comment: "The saffron threads are absolutely exceptional. They've transformed my paella and risotto dishes. The quality is unmatched!"
              },
              {
                name: "David Chen",
                role: "Home Cook & Food Blogger",
                image: "/placeholder-user.jpg",
                rating: 5,
                comment: "I've been using their Ras el Hanout for months. The depth of flavor it adds to my Moroccan tagines is incredible."
              },
              {
                name: "Sarah Johnson",
                role: "Restaurant Owner",
                image: "/placeholder-user.jpg",
                rating: 5,
                comment: "Our customers can't get enough of the cardamom pods. They're the secret ingredient in our signature chai blend."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/50 relative overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold font-[family-name:var(--font-playfair)] text-foreground mb-4">
              Stay Spice-Inspired
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
              Get exclusive recipes, spice tips, and cultural stories delivered to your inbox
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
              <Button size="lg" className="shrink-0 hover:scale-105 transition-all duration-300">
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Join 5,000+ spice enthusiasts. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          <Button
            size="icon"
            className="w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="group-hover:rotate-180 transition-transform duration-300">↑</span>
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            className="w-12 h-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          >
            <Heart className="w-5 h-5 group-hover:text-red-500 transition-colors duration-300" />
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            className="w-12 h-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          >
            <ShoppingCart className="w-5 h-5 group-hover:text-primary transition-colors duration-300" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h5 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-primary">Spice Bazaar</h5>
              </div>
              <p className="text-muted-foreground text-sm">
                Bringing authentic flavors from the world's finest spice markets to your kitchen.
              </p>
            </div>
            <div>
              <h6 className="font-semibold text-foreground mb-4">Shop</h6>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    All Spices
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Spice Blends
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Gift Sets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-foreground mb-4">Learn</h6>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Recipes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Spice Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Cooking Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Cultural Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold text-foreground mb-4">Connect</h6>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Social Media
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Spice Bazaar. All rights reserved. Made with ❤️ for spice lovers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
